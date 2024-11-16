# Team
Illini Blockchain - University of Illinois Urbana-Champaign

# Members
Keshav Ramamurthy, Eren Onder, Dev Udata

## Tasks and documentation

### Content Bounty
Feedback: https://docs.google.com/document/d/1b3mmHa-s2XIesAHDZne8-AK_2WkD7F4tcjNtGy5KXOM/edit

### Blocksense Task -- Retrieving Data Feed
We used Blocksense's documentation and API to build an oracle for the Fear & Greed Index, taking a step beyond the usual price feed applications to explore something more creative and impactful. Most hackers will likely stick to building price feeds, so we saw this as an opportunity to do something different and demonstrate a novel use of Blocksense’s technology. The Fear & Greed Index oracle aligns perfectly with our vision for future AI agents, especially as we work toward creating contrarian trader agents that can analyze multiple indices and make data-driven decisions against market trends. This implementation serves as a foundation for integrating advanced sentiment analysis into our AI agents, providing them with a richer understanding of market behavior. While this is just the starting point, we’re already looking forward to enhancing it further, making it a key piece of a more comprehensive, autonomous trading system that leverages both human-like intuition and machine precision.

**Feedback:**
- Most of our feedback was created during Task 1 in this Google form: https://docs.google.com/document/d/1b3mmHa-s2XIesAHDZne8-AK_2WkD7F4tcjNtGy5KXOM/edit
- For this task, we ran into some issues with creating a new oracle, so we edited the existing oracle to support our new implementation. The issues were errors with deploying the reporter and starting the docker containers; it's very possible that these were developer errors, but due to the time constraints we modified an existing oracle.

### Blocksense Task -- Reading Contracts on Manta Testnet
CONTRACT - `0x22A2Ede8D01F9F9A9Fdd977a112B7a12880bF924`

**Feedback:**
- When testing we found that only a subset of price feeds were enabled on the Manta Testnet -- it could be helpful to have that information listed on the documentation as we wrongly thought that the contracts were not working.
- Manta's documentation was very helpful, but it would be useful to make the faucet more clear about which testnet it is disbursing funds to.

### Pin AI Task 2 Documentation
We built an AI email analyzer that fetches a user’s emails and provides a clean, concise summary to make inbox management easier and more efficient. While the data is currently mocked due to time constraints, the groundwork is in place for integrating it with Gmail and leveraging OpenAI or Claude for the actual analysis. The goal is to create a simple, seamless way for users to get the gist of their emails without needing to sift through them manually. In the future, we’re planning to integrate this analyzer as an app on the PinAI layer, using OAuth mechanisms to ensure secure access and smooth functionality. This will allow users to easily connect their accounts and take advantage of AI-driven email insights directly within the PinAI ecosystem, combining convenience with the power of advanced AI tools.

### Pin AI Task 4 Improvement Documentation

Right now, the UI mockup for enabling and disabling AI agents is a simple, clean interface where users can toggle agents on or off with a single click. It’s functional as a basic proof of concept, but the plan is to take it much further. Once PinAI releases its libraries and documentation, the interface will be fully integrated to work in real-time, so toggling an agent will directly connect to its actual functionality and state. In the meantime, the focus will be on refining the design to make it even more intuitive and polished, while exploring ways to add small features that could improve the user experience, like displaying agent statuses or basic info about their roles. Gathering early feedback from users during this phase can help pinpoint what’s working and what needs tweaking, ensuring the final version is not just functional but genuinely useful and enjoyable to use.

**Feedback:**
- The idea is very technically interesting so we would definitely like to see a version of the libraries out soon so that we can play around and make personal, on-device AI agents using the framework.
- Due to the time constraint, the UI designed is a mockup, but our plans for the future with this project and with PinAI is to not change the user interface at all - to make it as simple as it is currently to enable and disable your AI agents.