# Realtime Media Smart Wire

## Identity

Name:
realtime-media

Version:
0.1.0

Domain:
AI-Native University

Type:
Realtime Media Smart Wire


## Purpose

Realtime Media Smart Wire provides the transport capability
for realtime audio communication between authorized participants
in a learning environment.

The Smart Wire connects a learning application capability
with dedicated realtime media infrastructure.

It is responsible for realtime media transport.

It is not responsible for learning domain logic.


## Core Principle

The Smart Wire transports realtime media.

It does not own:

- learning room business logic
- teacher identity logic
- student identity logic
- membership business logic
- learning content
- learning evidence
- knowledge representation
- Student Learning Profile


## Architectural Boundary

SBBox-LIS-LiveVoice
        │
        │ media transport contract
        ↓
Realtime Media Smart Wire
        │
        ↓
Realtime Media Infrastructure
        │
        └── WebRTC / SFU implementation


The Smart Wire provides an abstraction boundary
between the Smart Box and the underlying realtime
media infrastructure.


## Transport Model

The Smart Wire supports:

- realtime audio publishing
- realtime audio subscription
- participant connection
- participant disconnection
- media track publication
- media track subscription
- session connection status


## Participants

### Publisher

A publisher may publish an audio track
to a realtime media session.

For SBBox-LIS-LiveVoice version 0.1.0,
the teacher is the primary audio publisher.


### Listener

A listener may subscribe to an authorized
audio track.

For SBBox-LIS-LiveVoice version 0.1.0,
students are listeners by default.


## Connection Model

A participant connects to a realtime media session
using an authorization mechanism issued by
the application layer.

The Smart Wire must not expose infrastructure
credentials or server secrets to clients.


## Session Model

The Smart Wire represents a realtime media session
independently from the learning room domain.

Conceptually:

Learning Room
→ Realtime Media Session
→ Participants
→ Media Tracks


The mapping between learning room identity
and realtime media session identity is controlled
by the application layer.


## Media Model

A realtime media session may contain:

- audio tracks
- future video tracks
- future data tracks

Version 0.1.0 focuses on audio.


## Audio Flow

Teacher:

Microphone
→ Audio Capture
→ Realtime Media Smart Wire
→ Realtime Media Infrastructure


Student:

Realtime Media Infrastructure
→ Realtime Media Smart Wire
→ Audio Playback


The Smart Wire transports the media stream.

It does not interpret the semantic content
of the teacher's speech.


## Recording Boundary

Realtime transport and recording are separate concerns.

The Smart Wire may provide the transport required
for recording infrastructure.

Recording itself is not considered part of
the realtime transport responsibility.

Conceptually:

Live Voice
→ Realtime Media Smart Wire
→ Recording Infrastructure
→ Audio Artifact


## Security Boundary

The Smart Wire must enforce the following principles:

- clients must not receive infrastructure secrets
- clients must use short-lived authorization credentials
- participants must be authorized before joining
- unauthorized participants must not receive media
- server-side credentials must remain server-side
- room identity must not be trusted solely from client input
- publisher permissions must be explicitly controlled
- student microphone publishing is disabled by default
- media sessions must be isolated by session identity
- access must be revocable by the application layer


## Identity Separation

The Smart Wire does not define the identity system.

The application layer provides:

- teacher identity
- student identity
- authorization context
- learning room identity


The Smart Wire receives only the information
necessary to establish an authorized realtime session.


## Permission Model

The minimum permission model for version 0.1.0 is:

Teacher:
- connect
- publish audio

Student:
- connect
- subscribe to teacher audio

Student:
- cannot publish audio by default


Future versions may introduce:

- student voice participation
- moderated speaking
- multiple publishers
- teaching assistants
- breakout sessions
- role-based media permissions


## Failure Model

The Smart Wire must expose connection state
without exposing infrastructure implementation details.

Possible states include:

- connecting
- connected
- disconnected
- reconnecting
- failed


A temporary network failure must not be interpreted
as a learning failure.


## Provider Independence

The Smart Wire specification does not require
a specific realtime infrastructure provider.

Possible implementations may include:

- WebRTC infrastructure
- SFU infrastructure
- LiveKit
- another compatible realtime media platform


Changing the underlying provider should not require
changing the domain contract of SBBox-LIS-LiveVoice.


## Data Ownership

Realtime media is transported through the Smart Wire.

The Smart Wire does not require ownership
of all media data generated during a session.

Persistent media artifacts may be stored
in dedicated storage infrastructure.

The LIS core may retain:

- session metadata
- authorization metadata
- artifact references
- learning relationships


The raw media artifact may remain outside
the LIS core database.


## Learning Intelligence Boundary

The Smart Wire does not transform speech
into knowledge.

The future processing pipeline may be:

Audio
→ Transcript
→ Learning Evidence
→ Knowledge Atoms
→ Knowledge Relations
→ Knowledge Graph
→ Learning Intelligence
→ Living Book


These transformations belong to other
Smart Boxes or Smart Wires.


## Scalability

The Smart Wire must support horizontal scaling
of realtime media infrastructure.

The application layer and media transport layer
should be independently scalable.

The Smart Wire must not require the LIS application
server to relay every audio packet.


## Performance Principle

Realtime audio should travel through
dedicated realtime media infrastructure.

The LIS application server should primarily handle:

- authorization
- session coordination
- metadata
- control operations

It should not become the media bottleneck.


## Version 0.1.0 Scope

Version 0.1.0 supports:

- teacher audio publishing
- student audio subscription
- realtime audio transport
- participant connection
- participant disconnection
- authorization boundary
- connection status


Version 0.1.0 does not require:

- video
- student microphone publishing
- speech recognition
- AI transcription
- knowledge extraction
- automatic summarization
- Living Book generation


## Future Evolution

Future versions may support:

- server-side recording
- audio segment generation
- adaptive audio quality
- multiple teachers
- student speaking
- moderated discussion
- breakout rooms
- speech-to-text
- transcript synchronization
- knowledge extraction
- Learning Evidence generation
- Student Learning Profile integration
- Knowledge Graph integration
- Living Book integration