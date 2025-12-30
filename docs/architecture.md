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
