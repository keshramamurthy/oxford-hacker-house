'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Set this to true for testing without OpenAI API calls
const TESTING = true

interface Email {
  from: string
  name: string
  subject: string
  content: string
}

export function EmailSummaryAgentComponent() {
  const [emails, setEmails] = useState<Email[]>([])
  const [summary, setSummary] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (TESTING) {
      generateTestData()
    }
  }, [])

  const generateTestData = () => {
    const testEmails: Email[] = [
      {
        from: 'john.doe@gmail.com',
        name: 'John Doe',
        subject: 'Project Update: AI Integration',
        content: `Hi team,

I hope this email finds you well. I wanted to give you a quick update on our AI integration project. We've made significant progress in the past week, and I'm excited to share the details with you.

Key achievements:
1. Successfully implemented the natural language processing module
2. Completed initial testing of the chatbot interface
3. Resolved the data synchronization issues we were facing last month

Our next steps will be to refine the user experience and conduct more comprehensive testing. I've scheduled a team meeting for next Tuesday at 2 PM to discuss our progress and plan the next phase.

Please review the attached document for a more detailed breakdown of our progress and let me know if you have any questions or concerns.

Best regards,
John`
      },
      {
        from: 'sarah.smith@yahoo.com',
        name: 'Sarah Smith',
        subject: 'Invitation: Annual Company Picnic',
        content: `Dear Colleagues,

It's that time of the year again! I'm thrilled to invite you all to our Annual Company Picnic. This year's event promises to be better than ever, with fun activities, delicious food, and great company.

Event Details:
Date: Saturday, July 15th
Time: 11:00 AM - 4:00 PM
Location: Sunshine Park (map link attached)

We'll have a variety of activities including:
- Team building games
- Face painting for kids
- Live music
- Raffle with exciting prizes

Please RSVP by July 5th using the link below. Don't forget to indicate any dietary restrictions or special requirements.

[RSVP Link]

Looking forward to seeing you all there!

Best wishes,
Sarah
HR Department`
      },
      {
        from: 'tech.support@company.com',
        name: 'IT Support',
        subject: 'Scheduled System Maintenance',
        content: `Dear All,

This is a reminder that we will be conducting scheduled system maintenance this weekend. Please be aware of the following details:

Maintenance Window:
Start: Saturday, June 10th at 10:00 PM
End: Sunday, June 11th at 2:00 AM

Affected Systems:
- Email servers
- Internal project management tools
- VPN services

During this time, you may experience intermittent access issues to these services. We recommend saving your work and logging out of all systems by 9:30 PM on Saturday.

If you experience any issues after the maintenance window, please contact the IT support desk.

We appreciate your patience and understanding.

Best regards,
IT Support Team`
      },
      {
        from: 'marketing@newsletter.com',
        name: 'Marketing Team',
        subject: 'New Product Launch: Smart Home Assistant',
        content: `Hello Everyone,

We're excited to announce the launch of our latest product: the SmartHome AI Assistant!

Key Features:
- Voice-activated control for all your smart home devices
- Advanced machine learning for personalized user experience
- Energy-saving recommendations
- Seamless integration with popular smart home ecosystems

Launch Date: July 1st, 2023

We need all hands on deck to make this launch a success. Please review the attached marketing materials and familiarize yourself with the product features. We'll be having a company-wide training session on June 20th to ensure everyone is prepared to support this launch.

If you have any questions or ideas to contribute, please don't hesitate to reach out.

Let's make this our best product launch yet!

Best regards,
Marketing Team`
      },
      {
        from: 'jane.wilson@outlook.com',
        name: 'Jane Wilson',
        subject: 'Reminder: Quarterly Review Meeting',
        content: `Dear Team Leads,

This is a friendly reminder about our Quarterly Review Meeting scheduled for next Monday, June 15th, from 10:00 AM to 12:00 PM in the Main Conference Room.

Agenda:
1. Q2 Performance Review
2. Goal Setting for Q3
3. Budget Allocation Discussion
4. Open Floor for Team Updates

Please come prepared with your team's performance reports and proposed goals for the next quarter. If you need to add any items to the agenda, please let me know by EOD tomorrow.

Remember, this meeting is crucial for aligning our objectives and ensuring we're on track for our annual targets. Your active participation is highly appreciated.

Looking forward to a productive session!

Best regards,
Jane Wilson
Chief Operations Officer`
      }
    ]
    setEmails(testEmails)

    const testSummary = "Email Summary:\n\n" +
      "1. Project Update from John Doe: AI integration project progressing well. Team meeting scheduled for next Tuesday at 2 PM.\n\n" +
      "2. Company Picnic Invitation from Sarah Smith: Annual event on Saturday, July 15th, 11 AM - 4 PM at Sunshine Park. RSVP by July 5th.\n\n" +
      "3. IT Support Maintenance Notice: System maintenance scheduled for June 10th, 10 PM to June 11th, 2 AM. Affected systems include email, project management tools, and VPN.\n\n" +
      "4. New Product Launch from Marketing Team: SmartHome AI Assistant launching on July 1st. Company-wide training session on June 20th.\n\n" +
      "5. Quarterly Review Meeting Reminder from Jane Wilson: Meeting on Monday, June 15th, 10 AM - 12 PM. Team leads to prepare performance reports and Q3 goals.\n\n" +
      "Key Actions:\n" +
      "- Prepare for AI integration project team meeting\n" +
      "- RSVP for company picnic by July 5th\n" +
      "- Be aware of system maintenance and potential service disruptions\n" +
      "- Review SmartHome AI Assistant materials and attend training on June 20th\n" +
      "- Prepare reports and goals for Quarterly Review Meeting"
    setSummary(testSummary)
  }

  const generateEmails = async () => {
    if (TESTING) return

    setLoading(true)
    try {
      const response = await fetch('/api/generate-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: 5 })
      })
      const data = await response.json()
      setEmails(data.emails)
    } catch (error) {
      console.error('Error generating emails:', error)
    }
    setLoading(false)
  }

  const generateSummary = async () => {
    if (TESTING) return

    setLoading(true)
    try {
      const response = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails })
      })
      const data = await response.json()
      setSummary(data.summary)
    } catch (error) {
      console.error('Error generating summary:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <header className="bg-gray-800 py-6">
        <h1 className="text-2xl font-bold text-center text-white">PinAI Email Summary Agent</h1>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Your Emails</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emails.map((email, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg">
                    <p className="font-semibold text-white">{email.subject}</p>
                    <p className="text-sm text-gray-300">From: {email.name} ({email.from})</p>
                    <p className="mt-2 text-sm text-gray-300 whitespace-pre-wrap">{email.content}</p>
                  </div>
                ))}
              </div>
              {!TESTING && (
                <Button onClick={generateEmails} disabled={loading} className="mt-4 w-full">
                  {loading ? 'Generating...' : 'Generate Emails'}
                </Button>
              )}
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Your Email Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-700 p-4 rounded-lg whitespace-pre-wrap text-gray-300">
                {summary}
              </div>
              {!TESTING && (
                <Button onClick={generateSummary} disabled={loading || emails.length === 0} className="mt-4 w-full">
                  {loading ? 'Generating...' : 'Generate Summary'}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="bg-gray-800 py-4 text-center text-sm text-gray-300">
        Created by Keshav Ramamurthy, Eren Onder and Dev Udata for the Oxford Blockchain Society hackathon
      </footer>
    </div>
  )
}