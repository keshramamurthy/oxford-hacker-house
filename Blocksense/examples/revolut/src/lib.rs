use anyhow::Result;
use blocksense_sdk::{
    oracle::{DataFeedResult, DataFeedResultValue, Payload, Settings},
    oracle_component,
    spin::http::{send, Method, Request, Response},
};
use std::collections::HashMap;

use serde::Deserialize;
use serde_json::Value;
use url::Url;

#[allow(dead_code)]
#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct FearAndGreedResponse {
    pub name: String,
    pub data: Vec<FearAndGreedData>,
    pub metadata: Metadata,
}

#[allow(dead_code)]
#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
// #[serde(rename_all = "camelCase")]
pub struct FearAndGreedData {
    pub value: String,
    pub value_classification: String,
    pub timestamp: String,
    #[serde(rename = "time_until_update")]
    pub time_until_update: Option<String>,  // Optional field, only in some responses
}

#[allow(dead_code)]
#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Metadata {
    pub error: Option<String>,
}

#[derive(Default, Debug, Clone, PartialEq, Deserialize)]
pub struct CmcResource {
    pub cmc_id: u64,
    pub cmc_quote: String,
}

#[oracle_component]
async fn oracle_request(settings: Settings) -> Result<Payload> {
    // Build the URL for the Fear and Greed API
    let url = Url::parse("https://api.alternative.me/fng/")?;

    let mut req = Request::builder();
    req.method(Method::Get);
    req.uri(url);

    // Set the headers for the GET request
    req.header("Accept", "application/json");

    let req = req.build();

    // Send the request and capture the response
    let resp: Response = send(req).await?;
    let body = resp.into_body();
    let string = String::from_utf8(body).expect("valid utf8");

    // Parse the response body into the defined structs
    let value: FearAndGreedResponse = serde_json::from_str(&string)?;
    println!("Fear and Greed Index API Response = {}", &string);

    // Prepare the payload to return
    let mut payload: Payload = Payload::new();


    // Iterate through the settings data feeds and map to the response data
    for (feed_id, data_feed) in settings.data_feeds.iter().enumerate() {
        let data_feed_value = match value.data.get(0) {
            Some(data) => DataFeedResultValue::Numerical(data.value.parse::<f64>().unwrap_or(2.0)),
            None => DataFeedResultValue::Error("Data feed not found".to_string()),
        };

        println!("{:?}", data_feed_value);

        payload.values.push(DataFeedResult {
            id: data_feed.id.clone(),
            value: data_feed_value,
        });
    }

    // Return payload to be pushed to sequencer
    Ok(payload)
}