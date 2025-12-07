-- Stagbyte Lead Management Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Company info
  company TEXT NOT NULL,
  website TEXT,
  industry TEXT,
  company_size TEXT,
  location TEXT,
  linkedin_company_url TEXT,
  
  -- Contact info
  contact_name TEXT,
  contact_title TEXT,
  contact_email TEXT,
  contact_linkedin TEXT,
  
  -- Qualification
  score INTEGER DEFAULT 0,
  pain_points TEXT[],
  tech_stack TEXT[],
  
  -- Status tracking
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'researched', 'contacted', 'responded', 'qualified', 'customer')),
  last_contact TIMESTAMP,
  notes TEXT,
  
  -- Metadata
  source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'linkedin', 'referral', 'scraper')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Outreach table (track all communications)
CREATE TABLE outreach (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  
  -- Message details
  channel TEXT NOT NULL CHECK (channel IN ('email', 'linkedin', 'phone')),
  subject TEXT,
  body TEXT NOT NULL,
  
  -- Tracking
  sent_at TIMESTAMP DEFAULT NOW(),
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  replied_at TIMESTAMP,
  reply_content TEXT,
  
  -- AI analysis
  ai_reasoning TEXT,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW()
);

-- Email sequences
CREATE TABLE sequences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  emails JSONB NOT NULL, -- Array of email templates
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Scheduled emails (for cron job)
CREATE TABLE scheduled_emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  sequence_id UUID REFERENCES sequences(id),
  
  -- Email data
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  
  -- Scheduling
  scheduled_for TIMESTAMP NOT NULL,
  sent_at TIMESTAMP,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'cancelled')),
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_score ON leads(score DESC);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_outreach_lead_id ON outreach(lead_id);
CREATE INDEX idx_outreach_sent_at ON outreach(sent_at DESC);
CREATE INDEX idx_scheduled_emails_scheduled_for ON scheduled_emails(scheduled_for);
CREATE INDEX idx_scheduled_emails_status ON scheduled_emails(status);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sequences_updated_at BEFORE UPDATE ON sequences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default email sequence
INSERT INTO sequences (name, description, emails) VALUES (
  'Cold Outreach Sequence',
  'Standard 4-email sequence for cold outreach',
  '[
    {
      "step": 1,
      "delay_days": 0,
      "subject": "Quick question about {{company}}",
      "body": "Hi {{contact_name}},\n\nI noticed {{company}} is {{observation}}.\n\n{{value_prop}}\n\nWould a 15-min demo be helpful?\n\nBest,\nErvin"
    },
    {
      "step": 2,
      "delay_days": 3,
      "subject": "Re: Quick question about {{company}}",
      "body": "Hi {{contact_name}},\n\nJust following up on my previous email.\n\nI''d love to show you how we can help {{company}} {{benefit}}.\n\nAre you available for a quick call this week?\n\nBest,\nErvin"
    },
    {
      "step": 3,
      "delay_days": 7,
      "subject": "Free automation audit for {{company}}",
      "body": "Hi {{contact_name}},\n\nI''d like to offer {{company}} a free automation audit.\n\nWe''ll analyze your workflows and show you exactly where AI can save time and money.\n\nInterested?\n\nBest,\nErvin"
    },
    {
      "step": 4,
      "delay_days": 14,
      "subject": "Last follow-up",
      "body": "Hi {{contact_name}},\n\nI''ll stop bothering you after this :)\n\nIf you''re ever interested in automating {{pain_point}}, feel free to reach out.\n\nBest of luck with {{company}}!\n\nErvin"
    }
  ]'::jsonb
);

-- Create view for dashboard stats
CREATE VIEW outreach_stats AS
SELECT 
  COUNT(DISTINCT l.id) as total_leads,
  COUNT(DISTINCT CASE WHEN l.status != 'new' THEN l.id END) as contacted_leads,
  COUNT(DISTINCT CASE WHEN l.status = 'responded' THEN l.id END) as responded_leads,
  COUNT(DISTINCT CASE WHEN l.status = 'qualified' THEN l.id END) as qualified_leads,
  COUNT(DISTINCT CASE WHEN l.status = 'customer' THEN l.id END) as customers,
  COUNT(DISTINCT o.id) as total_outreach,
  COUNT(DISTINCT CASE WHEN o.channel = 'email' THEN o.id END) as emails_sent,
  COUNT(DISTINCT CASE WHEN o.opened_at IS NOT NULL THEN o.id END) as emails_opened,
  COUNT(DISTINCT CASE WHEN o.replied_at IS NOT NULL THEN o.id END) as emails_replied
FROM leads l
LEFT JOIN outreach o ON l.id = o.lead_id;

COMMENT ON TABLE leads IS 'Stores all lead information and qualification data';
COMMENT ON TABLE outreach IS 'Tracks all outreach communications with leads';
COMMENT ON TABLE sequences IS 'Email sequence templates';
COMMENT ON TABLE scheduled_emails IS 'Emails scheduled to be sent by cron job';
