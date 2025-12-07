/**
 * Test Script for Lead Generation System
 * 
 * Run this to test the lead generation workflow
 */

import { generateLeads, getLeadsForOutreach } from './src/lib/lead-generation';

async function testLeadGeneration() {
    console.log('🚀 Testing Lead Generation System\n');

    try {
        // Generate leads
        console.log('Step 1: Generating leads...');
        const leads = await generateLeads(10); // Start with 10 for testing

        console.log('\n📊 Generated Leads:');
        console.log('==================');

        leads.forEach((lead, index) => {
            console.log(`\n${index + 1}. ${lead.company}`);
            console.log(`   Score: ${lead.score}/100`);
            console.log(`   Industry: ${lead.industry}`);
            console.log(`   Website: ${lead.website}`);
            if (lead.contactName) {
                console.log(`   Contact: ${lead.contactName} (${lead.contactTitle})`);
            }
        });

        // Get high-priority leads
        console.log('\n\n🎯 High Priority Leads (Score >= 70):');
        console.log('====================================');

        const highPriority = await getLeadsForOutreach(70, 5);

        if (highPriority.length === 0) {
            console.log('No high-priority leads found. Try adding more companies or lowering the score threshold.');
        } else {
            highPriority.forEach((lead, index) => {
                console.log(`\n${index + 1}. ${lead.company} (Score: ${lead.score})`);
                console.log(`   Ready for outreach!`);
            });
        }

        console.log('\n\n✅ Test Complete!');
        console.log('\nNext steps:');
        console.log('1. Add more companies to src/lib/lead-generation/company-scraper.ts');
        console.log('2. Run this script again to generate more leads');
        console.log('3. Use the top leads for your outreach campaign');

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

// Run the test
testLeadGeneration();
