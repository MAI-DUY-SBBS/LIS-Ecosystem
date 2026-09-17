# SBBox-LIS-LiveVoice

## Rules

### 1. Smart Box Boundary

SBBox-LIS-LiveVoice is responsible for the learning
voice capability.

It is responsible for:

- live voice session state
- teacher voice publishing
- student voice participation as listener
- audio segment creation
- audio artifact metadata
- playback authorization
- download authorization

It is not responsible for:

- learning room creation
- room membership management
- teacher identity management
- student identity management
- general chat messaging
- knowledge graph management
- Learning Intelligence orchestration


### 2. Room Integration

SBBox-LIS-LiveVoice operates inside a learning room
provided by SBBox-LIS-Room.

A voice session must be associated with a valid room.

SBBox-LIS-LiveVoice must not create or redefine
the learning room.

The room remains the domain boundary for learning
communication.


### 3. Identity

Every voice session must be associated with:

- room identity
- teacher identity

Every student listener must be associated with:

- room identity
- student identity

The Smart Box does not define a separate identity system.

Identity is supplied by the surrounding LIS ecosystem.


### 4. Authorization

Only an authorized teacher may:

- start a live voice session
- stop a live voice session

Only an authorized learner may:

- join a live voice session
- receive teacher live voice
- access authorized audio segments

Student microphone publishing is disabled by default
in version 0.1.0.


### 5. Session State

A voice session follows the state transition:

IDLE
→ LIVE
→ COMPLETED

A session must not transition directly from:

IDLE
→ COMPLETED

A completed session must not return to:

COMPLETED
→ LIVE

A new live session must create a new session identity.


### 6. Teacher Voice

The teacher is the primary voice publisher.

Version 0.1.0 supports:

Teacher
→ Live Voice
→ Learners

Version 0.1.0 does not provide general
student-to-student voice broadcasting.


### 7. Realtime Media Boundary

Realtime audio must not be transported through
the LIS Room REST API.

The Smart Box delegates realtime media transport
to dedicated WebRTC/SFU infrastructure.

The media infrastructure is a Smart Wire.

The Smart Box remains responsible for the
learning-domain capability and orchestration boundary.


### 8. Media Infrastructure Independence

The Smart Box must not depend on a specific
realtime media infrastructure implementation.

A realtime provider may be replaced without
changing the Smart Box capability contract.

Provider-specific implementation details belong
to the implementation layer.


### 9. Audio Segment

When a teacher stops a live voice session,
the completed session may become an audio segment.

An audio segment must have:

- audio segment identity
- voice session identity
- room identity
- teacher identity
- start time
- end time
- duration
- creation timestamp


### 10. Audio Artifact

An audio artifact is a stored representation
of a completed audio segment.

The artifact may be stored outside the LIS core database.

The LIS core may retain:

- artifact identity
- metadata
- storage reference
- authorization information

The LIS core does not need to own the raw audio bytes.


### 11. Data Ownership

LIS does not necessarily need to store all data
created by LIS.

Realtime media and raw audio artifacts may exist
outside the LIS core.

The Smart Box should retain only the information
necessary for:

- orchestration
- authorization
- governance
- learning context
- artifact discovery


### 12. Learning Data Boundary

Raw audio is not automatically knowledge.

The following transformations belong to future
learning-intelligence capabilities:

Audio
→ Transcript
→ Learning Evidence
→ Knowledge Atoms
→ Knowledge Relations
→ Knowledge Graph

SBBox-LIS-LiveVoice provides the audio artifact
that may become an input to those capabilities.


### 13. Playback

Only authorized users may play a completed
audio segment.

Playback must not modify the original audio artifact.

Playback is a read operation.


### 14. Download

Only authorized users may download a completed
audio segment.

The download mechanism should use a controlled
artifact reference or authorized download URL.

The Smart Box must not expose internal storage
credentials to users.


### 15. Student Microphone

Student microphone publishing is disabled by default
in version 0.1.0.

Any future capability that enables student voice
publishing must introduce an explicit authorization
rule and a new capability version.


### 16. Privacy

Voice sessions may contain personal information,
teaching content, student information, or other
sensitive learning material.

The implementation must minimize unnecessary
collection and retention.

Access to audio artifacts must follow the
authorization rules of the learning environment.


### 17. Separation of Concerns

The following responsibilities must remain separated:

Learning Room
→ SBBox-LIS-Room

Realtime Voice
→ SBBox-LIS-LiveVoice

Realtime Media Transport
→ Smart Wire / WebRTC / SFU

Persistent Artifact Storage
→ Storage Infrastructure

Learning Intelligence
→ LIS Intelligence Layer

Knowledge Representation
→ Knowledge Graph / Living Book


### 18. API Boundary

The Smart Box interface defines WHAT the capability
provides.

The implementation defines HOW the capability
is executed.

Implementation details must not redefine the
Smart Box interface.

The interface contract is the boundary between
the Smart Box and its surrounding system.


### 19. No Infrastructure Leakage

Smart Box business logic must not directly depend
on infrastructure-specific storage, networking,
or provider internals.

Infrastructure access must pass through explicit
interfaces or adapters.

This allows infrastructure components to evolve
without changing the learning capability contract.


### 20. Failure Handling

Failure of realtime media transport must not
corrupt the learning room state.

Failure to create an audio artifact must not
retroactively alter the completed voice session.

The implementation must distinguish between:

- session failure
- media failure
- recording failure
- storage failure
- authorization failure


### 21. Version 0.1.0 Scope

Version 0.1.0 includes:

- teacher live voice
- student listening
- realtime voice transport
- voice session state
- completed audio segment
- audio artifact metadata
- playback
- authorized download

Version 0.1.0 does not include:

- student voice publishing
- automatic transcription
- AI summarization
- knowledge extraction
- Learning Profile integration
- Knowledge Graph integration
- Living Book generation
- personalized AI tutoring


### 22. Evolution Rule

New capabilities should be added as explicit
Smart Box capabilities.

New functionality must not silently overload
existing capabilities.

When a new capability changes the contract,
the Smart Box version must evolve accordingly.


### 23. Core LIS Principle

SBBox-LIS-LiveVoice follows the three principles:

DATA

LIS does not necessarily own all data.

FLOW

LIS manages the flow of intelligence.

EVOLUTION

LIS preserves the evidence necessary to support
the continuous evolution of learning intelligence.


### 24. Architectural Principle

The Smart Box is a reusable intelligence capability.

It should be:

- composable
- replaceable
- versionable
- independently evolvable
- connected through explicit interfaces

The Smart Box must not become a monolithic application.


### 25. Future Intelligence Flow

The long-term learning flow is:

Live Voice
→ Audio Segment
→ Transcript
→ Learning Evidence
→ Knowledge Atoms
→ Knowledge Relations
→ Knowledge Graph
→ Learning Intelligence
→ Living Book

SBBox-LIS-LiveVoice provides the first stage
of this intelligence flow.