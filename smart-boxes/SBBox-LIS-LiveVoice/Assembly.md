# SBBox-LIS-LiveVoice

## Assembly

### 1. Purpose

SBBox-LIS-LiveVoice is assembled as a learning voice
capability inside the LIS ecosystem.

It does not operate as an isolated application.

The Smart Box composes with:

- SBBox-LIS-Room
- Smart Wire
- Realtime Media Infrastructure
- Persistent Artifact Storage
- future Learning Intelligence capabilities


### 2. Assembly Principle

Assembly composes existing capabilities.

Assembly does not duplicate the business logic
of participating Smart Boxes.

The composition is:

SBBox-LIS-Room
→ provides learning room context

SBBox-LIS-LiveVoice
→ provides realtime voice capability

Smart Wire
→ provides realtime media transport

Storage Infrastructure
→ preserves audio artifacts

LIS Intelligence Layer
→ processes learning artifacts in future versions


### 3. High-Level Architecture

```text
                         LIS Ecosystem
                              │
                              ▼
                    ┌──────────────────┐
                    │ SBBox-LIS-Room   │
                    │                  │
                    │ Room             │
                    │ Membership       │
                    │ Identity Context │
                    └────────┬─────────┘
                             │
                        Room Context
                             │
                             ▼
                  ┌──────────────────────┐
                  │ SBBox-LIS-LiveVoice  │
                  │                      │
                  │ Voice Session        │
                  │ Authorization        │
                  │ Audio Artifact       │
                  └──────────┬───────────┘
                             │
                        Smart Wire
                             │
                             ▼
                  ┌──────────────────────┐
                  │ Realtime Media       │
                  │ Infrastructure       │
                  │                      │
                  │ WebRTC / SFU         │
                  └──────────┬───────────┘
                             │
                 ┌───────────┴───────────┐
                 ▼                       ▼
             Teacher 🎙               Students 👥