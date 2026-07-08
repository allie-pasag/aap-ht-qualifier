export interface QuizAnswers {
  first_name: string;
  last_name: string;
  email: string;
  offer_status?: 'multiple_ideas' | 'one_skill' | 'has_offer';
  most_money?: 'one_money' | 'all_similar' | 'none' | 'same_skill';
  solved_for_someone?: 'yes_paid' | 'yes_free' | 'not_yet';
  converting?: 'yes' | 'somewhat' | 'no';
  infrastructure?: 'nothing' | 'needs_improvement' | 'working';
  new_or_improve?: 'new_offer' | 'improve';
  what_they_have?: string[];
  urgency?: '30_days' | '60_90_days' | '3_6_months';
}

export interface QuizResult {
  client_type: '1' | '2' | '3' | '4' | '5' | 'live_new' | 'live_improve';
  client_bucket: 'A' | 'B' | 'C';
  price_anchor: string;
  price_note: string;
  headline: string;
  summary: string;
  diagnosis: string;
  status_tiles: {
    offer_status: string;
    validation: string;
    conversion: string;
    timeline: string;
  };
}

// Language layer mapping based on Section 6 of the spec
export const languageLayer = {
  offer_status: {
    multiple_ideas: "This person has multiple income streams or offer ideas and can't decide which to lead with. The market can't tell what they're known for. Until one offer is clear, building anything else just adds to the noise.",
    one_skill: "This person has one clear skill but hasn't packaged it into something they can sell. The ability exists. The offer doesn't yet.",
    has_offer: "This person has a defined offer they're actively selling or trying to sell."
  },
  most_money: {
    one_money: "They already know which direction works. The hesitation is the only thing slowing them down.",
    all_similar: "When everything feels equal, nothing gets chosen — including by their clients.",
    none: "Pre-revenue across the board. The first job is clarity, not infrastructure.",
    same_skill: "Not confused about what they do. Confused about how to position it."
  },
  solved_for_someone: {
    yes_paid: "Someone has already paid for this — the offer is real, even if it's not packaged yet.",
    yes_free: "The proof exists but the business doesn't yet. Delivery is proven, pricing isn't.",
    not_yet: "Still an idea. That's not a problem — it just means we start at the beginning."
  },
  converting: {
    yes: "The offer is working. The question now is whether the infrastructure matches what they've built.",
    somewhat: "Inconsistent results almost never mean the funnel is broken. Something upstream isn't landing clearly enough for strangers to say yes without a conversation.",
    no: "If it's not converting, building more infrastructure won't fix it. The offer needs attention first."
  },
  infrastructure: {
    nothing: "No infrastructure exists yet. Clean foundation to build from.",
    needs_improvement: "Something is built but it's not working. Before fixing the build, we need to know why.",
    working: "Infrastructure exists and it's working. The question is whether it matches what they've built and where they're going next."
  },
  new_or_improve: {
    new_offer: "They have a working system and want to build for a new offer. Needs both offer strategy and infrastructure.",
    improve: "They have a working system and want to improve what exists. Scope confirmed on the call."
  },
  urgency: {
    '30_days': "They need to move fast — scope and prioritization should reflect urgency.",
    '60_90_days': "Enough runway to do this right without rushing.",
    '3_6_months': "In planning mode — can be strategic about sequencing and starting point."
  }
};

export function calculateQuizResult(answers: QuizAnswers): QuizResult {
  let client_type: '1' | '2' | '3' | '4' | '5' | 'live_new' | 'live_improve' = '1';
  let client_bucket: 'A' | 'B' | 'C' = 'A';
  let price_anchor = 'Starting from $2,500';
  let price_note = '';
  
  // Gate 1: Offer Status
  if (answers.offer_status === 'multiple_ideas') {
    client_bucket = 'A';
    if (answers.most_money === 'same_skill') {
      client_type = '2';
    } else {
      client_type = '1';
    }
    price_anchor = 'Starting from $2,500';
    price_note = 'Scope is focused entirely on establishing offer clarity and single-offer positioning.';
  } else if (answers.offer_status === 'one_skill') {
    if (answers.solved_for_someone === 'yes_paid') {
      // Passes Gate 1 -> goes to Gate 2 & 3
      if (answers.converting === 'yes') {
        if (answers.infrastructure === 'nothing') {
          client_type = '5';
          client_bucket = 'C';
          price_anchor = 'Starting from $4,500';
          price_note = 'Full infrastructure build-out for your validated offer.';
        } else {
          // Working and yes
          client_bucket = 'C';
          if (answers.new_or_improve === 'new_offer') {
            client_type = '4'; // live_new / Ceiling Hitter
            price_anchor = 'Starting from $6,500';
            price_note = 'Full design and launch layer for your new high-ticket evolution.';
          } else {
            client_type = 'live_improve';
            price_anchor = 'Starting from $4,500';
            price_note = 'Targeted upgrade of existing system layers. Scope confirmed on call.';
          }
        }
      } else {
        // Converting somewhat/no
        client_type = '3';
        client_bucket = 'B';
        price_anchor = 'Starting from $2,500';
        price_note = 'Includes custom positioning diagnosis + targeted setup fix (scope confirmed after call).';
      }
    } else {
      // solved_for_someone is yes_free or not_yet -> Client Type 2, Bucket A
      client_type = '2';
      client_bucket = 'A';
      price_anchor = 'Starting from $2,500';
      price_note = 'Scope is focused entirely on offer strategy and structured packaging.';
    }
  } else if (answers.offer_status === 'has_offer') {
    // Gate 2: Converting Status
    if (answers.converting === 'yes') {
      // Gate 3: Infrastructure
      if (answers.infrastructure === 'nothing') {
        client_type = '5';
        client_bucket = 'C';
        price_anchor = 'Starting from $4,500';
        price_note = 'Full infrastructure build-out for your validated offer.';
      } else {
        // working or needs_improvement. If yes + working:
        client_bucket = 'C';
        if (answers.new_or_improve === 'new_offer') {
          client_type = '4'; // live_new / Ceiling Hitter
          price_anchor = 'Starting from $6,500';
          price_note = 'Full design and launch layer for your new high-ticket evolution.';
        } else {
          client_type = 'live_improve';
          price_anchor = 'Starting from $4,500';
          price_note = 'Targeted upgrade of existing system layers. Scope confirmed on call.';
        }
      }
    } else {
      // Converting is somewhat/no
      client_type = '3';
      client_bucket = 'B';
      price_anchor = 'Starting from $2,500';
      price_note = 'Includes custom positioning diagnosis + targeted setup fix (scope confirmed after call).';
    }
  }

  // Set Headlines based on Section 6
  let headline = '';
  let summary = '';
  let diagnosis = '';

  const name = answers.first_name || 'there';

  if (client_bucket === 'A') {
    if (client_type === '1') {
      headline = "You know what you're good at. You just can't decide which version of it to sell.";
      summary = `Right now, ${name}, you're sitting on a massive wealth of knowledge, multiple offer ideas, and several potential directions. But because everything is a possibility, nothing is getting your full focus. The market cannot clearly identify what you are the go-to authority for.`;
      diagnosis = `The real obstacle isn't your systems, your tech, or your sales copy — it is selection. Trying to build any funnel, landing page, or audience campaigns right now will only amplify the confusion. We need to lock in one clear, high-ticket front-end offer before we write a single line of code.`;
    } else {
      // Client Type 2
      headline = "You know exactly what you want to do. You just haven't built it into something people can buy yet.";
      summary = `You have a clear, powerful skill, ${name}, and you've already proven you can deliver results for people. The expertise is fully real, but it remains unstructured. Right now, it's living as a service or an idea rather than a clean, repeatable, premium asset that people can easily purchase.`;
      diagnosis = `You do not have an infrastructure problem; you have a packaging problem. Before worrying about complex funnels, you need a high-ticket offer architecture that handles the pricing, the delivery boundaries, and the value positioning for you. Once that offer is packaged, the build becomes straightforward.`;
    }
  } else if (client_bucket === 'B') {
    headline = "Something is off — and it's worth finding out why before you build anything else.";
    summary = `You have an active offer in the market, ${name}, and you've been working hard to push it. However, the conversion is inconsistent, leaving you guessing from week to week. You have some form of active landing page or systems, but they aren't generating a repeatable flow of buyers.`;
    diagnosis = `It's easy to blame the funnel, the niche, or the ads, but the problem is almost always upstream positioning. If strangers need a long conversation to see the value, the messaging is too generic. We need to diagnose exactly where the disconnect lies between what you do and what the market is willing to pay for, then fix the specific system layers holding you back.`;
  } else {
    // Bucket C
    headline = "You have proof. Your system doesn't match what you've built.";
    
    if (client_type === '5') {
      summary = `You have a fully validated offer, ${name}, consistent clients, and documented success. You know exactly what you sell and to whom, but you're missing the backend engine to support it. Right now, you're relying on manual effort, messages, or duct-tape setups to keep things moving.`;
      diagnosis = `You have completed the hardest part of business: product-market fit. Now, your growth is capped purely by delivery and operational limits. You don't need offer strategy; you need a professional, automated, high-converting machine built from the ground up so you can scale without breaking.`;
    } else if (client_type === '4') {
      summary = `You've built a successful system and offer, ${name}, but you've hit a ceiling. You're likely undercharging, overdelivering, or outgrowing the client profile you currently attract. You want to shift into a new, higher-level offer, but your current system is designed for where you were, not where you're going.`;
      diagnosis = `The business model that got you here will not get you there. To attract higher-tier buyers, we must completely realign your positioning, raise your price floor, and build a premium launch layer that reflects your true tier of authority. Let's design the next evolution of your business.`;
    } else {
      // live_improve
      summary = `Your core system and high-ticket offer are actively working, ${name}, but you know there are holes in the bucket. Whether it's lead flow, email automation, checkout flows, or pipeline tracking, the current machine is functioning but not optimized for maximum yield.`;
      diagnosis = `You don't need to rebuild the wheel. Your foundation is excellent. What you need is an expert audit and a targeted optimization of your active pages, automated nurture sequences, and pipeline stages to plug the leaks and lift your total customer lifetime value.`;
    }
  }

  // Get status tiles values per bucket
  let status_tiles = {
    offer_status: 'Unclear',
    validation: 'Not yet',
    conversion: 'Pre-market',
    timeline: answers.urgency === '30_days' ? 'Within 30 Days' : answers.urgency === '60_90_days' ? '60 - 90 Days' : '3 - 6 Months'
  };

  if (client_bucket === 'B') {
    status_tiles.offer_status = 'Exists';
    status_tiles.validation = 'Validated';
    status_tiles.conversion = 'Inconsistent';
  } else if (client_bucket === 'C') {
    status_tiles.offer_status = 'Validated';
    status_tiles.validation = 'Proven';
    status_tiles.conversion = 'Working';
  }

  return {
    client_type,
    client_bucket,
    price_anchor,
    price_note,
    headline,
    summary,
    diagnosis,
    status_tiles
  };
}
