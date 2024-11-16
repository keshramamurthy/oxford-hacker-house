'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Agent {
  id: number
  name: string
  logo: string
  enabled: boolean
}

export function AiAgentsToggleDark() {
  const [agents, setAgents] = useState<Agent[]>([
    { id: 1, name: 'Gmail Agent', logo: 'https://www.gstatic.com/images/branding/product/2x/gmail_2020q4_32dp.png', enabled: true },
    { id: 2, name: 'Slack Agent', logo: 'https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png', enabled: true },
    { id: 3, name: 'Trello Agent', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-trello-226534.png', enabled: true },
    { id: 4, name: 'Jira Agent', logo: 'https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png', enabled: false },
    { id: 5, name: 'Notion Agent', logo: 'https://www.notion.so/front-static/favicon.ico', enabled: false },
    { id: 6, name: 'Dropbox Agent', logo: 'https://aem.dropbox.com/cms/content/dam/dropbox/www/en-us/branding/app-dropbox-ios@2x.png', enabled: false },
  ])

  const toggleAgent = (id: number) => {
    setAgents(agents.map(agent => 
      agent.id === id ? { ...agent, enabled: !agent.enabled } : agent
    ))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="text-center py-6">
        <h1 className="text-3xl font-bold">UI for AI Agent Toggler</h1>
      </header>
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Enabled</h2>
              <div className="space-y-2">
                {agents.filter(agent => agent.enabled).map(agent => (
                  <AgentItem key={agent.id} agent={agent} onClick={() => toggleAgent(agent.id)} />
                ))}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Disabled</h2>
              <div className="space-y-2">
                {agents.filter(agent => !agent.enabled).map(agent => (
                  <AgentItem key={agent.id} agent={agent} onClick={() => toggleAgent(agent.id)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-gray-400">
        Created by Keshav Ramamurthy, Eren Onder and Dev Udata for the Oxford Blockchain Society hackathon
      </footer>
    </div>
  )
}

function AgentItem({ agent, onClick }: { agent: Agent; onClick: () => void }) {
  return (
    <div 
      className="flex items-center p-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
      onClick={onClick}
    >
      <Image src={agent.logo} alt={`${agent.name} logo`} width={40} height={40} className="mr-2 rounded" />
      <span>{agent.name}</span>
    </div>
  )
}