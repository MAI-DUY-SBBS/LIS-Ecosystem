# Realtime Media Smart Wire Rules

## 1. Architectural Boundary

Realtime Media Smart Wire is responsible for transporting
realtime audio between authorized participants.

It is a transport and infrastructure boundary.

It must not become the business logic of SBBox-LIS-LiveVoice.


## 2. Smart Box Responsibility

SBBox-LIS-LiveVoice owns:

- voice session identity
- room association
- participant authorization
- session lifecycle
- learning metadata
- audio artifact metadata
- integration with learning intelligence

Realtime Media Smart Wire owns:

- realtime media connection
- audio transport
- participant media connection
- media connection state


## 3. Media Transport

Realtime audio must not be transported through
the LIS Room REST API.

The realtime media path should use a dedicated
WebRTC-based realtime media infrastructure.

The application/API layer may authorize and establish
the connection, but it must not act as the media server.


## 4. Teacher Publishing Rule

The teacher is the primary audio publisher.

A teacher may publish audio only when:

- the teacher is authorized for the learning room
- a valid voice session exists
- the session is active


## 5. Student Listening Rule

Students are listeners by default.

A student may receive teacher audio only when:

- the student is authorized for the learning room
- the student has joined the voice session
- the voice session is active

Student microphone publishing is disabled by default
in version 0.1.0.


## 6. Session Lifecycle

A voice session follows:

START
→ CREATED
→ ACTIVE
→ STOP
→ ENDED


Only an authorized teacher may start or stop
the voice session.

A session must not remain active after
the teacher explicitly stops the session.


## 7. Audio Segment Rule

A completed voice session may produce an audio segment.

The segment must preserve at least:

- audio_segment_id
- voice_session_id
- room_id
- teacher_identity
- segment_start
- segment_end
- duration
- storage_reference
- created_at


The audio segment is an artifact.

It must not automatically be treated as knowledge.


## 8. Recording Rule

Realtime media transport and audio recording
are separate responsibilities.

The realtime media layer may provide the media stream
required for recording.

Recording storage must not be coupled to the
LIS core database.


## 9. Data Ownership Rule

LIS does not necessarily need to store all data
created by LIS.

Realtime media and audio artifacts may be stored
outside the LIS core database.

The LIS core should retain only the metadata and
references required for:

- orchestration
- authorization
- governance
- learning integration
- artifact discovery


## 10. Privacy Rule

Realtime media must be accessible only to
authorized participants.

A student's microphone must not be activated
without an explicit user action and authorization.

Audio artifacts must not be publicly accessible
by default.

Download access must be authorized.


## 11. Interface Contract Rule

The Smart Wire must communicate with
SBBox-LIS-LiveVoice through defined interfaces.

The Smart Wire must not directly access:

- unrelated Smart Box internals
- unrelated application state
- the LIS core database
- another Smart Box's private implementation


## 12. Infrastructure Independence

SBBox-LIS-LiveVoice must not depend on a specific
realtime media provider at the Smart Box interface level.

The underlying provider may be replaced without
changing the conceptual Smart Box capabilities.

Example:

SBBox-LIS-LiveVoice
        ↓
Realtime Media Smart Wire
        ↓
WebRTC / SFU Infrastructure


## 13. Failure Rule

Failure of the realtime media infrastructure
must not corrupt the identity or learning metadata
of the LIS Room.

Media failure should be represented as connection
or session state.

It must not silently create false learning evidence.


## 14. Learning Evidence Rule

Raw audio is not automatically learning evidence.

The transformation must be explicit:

Audio
→ Transcript
→ Learning Evidence
→ Knowledge Atoms


Only future processing components may perform
knowledge extraction.


## 15. Evolution Rule

The Smart Wire may evolve independently from
SBBox-LIS-LiveVoice.

Possible future capabilities include:

- server-side recording
- adaptive audio quality
- multiple teachers
- student speaking
- moderated discussion
- breakout rooms
- speech-to-text
- transcript synchronization
- knowledge extraction


## 16. Core Principle

The Smart Wire carries the flow.

The Smart Box defines the meaning.

The infrastructure provides the capability.

Therefore:

Smart Box
→ defines WHAT

Smart Wire
→ defines HOW

Infrastructure
→ provides the underlying service


## 17. AI-Native University Principle

Realtime voice should be treated as more than
a communication channel.

A completed voice session may become a learning artifact
and may participate in the future flow:

Live Voice
→ Audio
→ Transcript
→ Learning Evidence
→ Knowledge
→ Learning Intelligence
→ Living Book