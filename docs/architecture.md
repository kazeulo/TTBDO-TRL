# Architecture

## Overview

The system consists of a Wix-based frontend application, a structured assessment engine, and an AI-powered recommendation layer powered by Hugging Face models.

## System Components

### Frontend (Wix Application)
- User interface for assessment input
- Form-based readiness evaluation across defined categories
- Visualization of TRL scores and recommendations

### Assessment Logic
- Rule-based evaluation of readiness criteria
- Normalization and aggregation of assessment inputs
- Mapping of results to TRL stages

### Recommendation Engine
- Converts assessment outputs into structured prompts
- Generates contextualized guidance using AI models

### AI Services (Hugging Face)
- Natural language generation for recommendations
- Ensures consistent tone and explainability

## Data Flow

1. The user completes a TRL assessment via the Wix frontend.
2. Input data is validated and structured.
3. Assessment logic evaluates readiness across defined categories.
4. Results are mapped to a TRL level and supporting indicators.
5. Structured prompts are sent to the AI service.
6. Generated recommendations are returned and displayed to the user.

## Assessment and Recommendation Pipeline

The assessment pipeline consists of:
- Criteria-based scoring for each readiness dimension
- Weighted aggregation of scores
- Identification of maturity gaps
- Translation of gaps into recommendation prompts

Recommendations are indicative and designed to support decision-making,
not replace expert review.

## AI integration Architecture

TRLars integrates Hugging Face-hosted language models to generate
context-aware recommendations.

The AI component:
- Does not determine TRL scores
- Operates only on structured assessment outputs
- Produces narrative guidance aligned with predefined frameworks
- Does not retain user data beyond request processing
