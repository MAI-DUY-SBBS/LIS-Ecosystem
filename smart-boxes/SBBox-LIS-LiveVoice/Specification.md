# SBBox-LIS-LiveVoice

## Identity

Name:
SBBox-LIS-LiveVoice

Version:
0.1.0

Domain:
AI-Native University

Type:
Realtime Learning Communication Smart Box


## Purpose

SBBox-LIS-LiveVoice provides a realtime voice communication
capability for learning environments.

The Smart Box allows a teacher to publish live voice to
learners participating in a LIS learning room.

Each completed voice session may be preserved as an
audio learning segment for later playback, download,
and future knowledge processing.


## Core Principle

Live voice is treated not only as communication,
but also as a potential learning artifact.

A live voice session may evolve into:

Live Voice
→ Audio Segment
→ Transcript
→ Knowledge Atoms
→ Knowledge Relations
→ Knowledge Graph
→ Learning Intelligence
→ Living Book


## Capability

- Start live voice
- Stop live voice
- Join live voice
- Receive teacher live voice
- Record completed voice segment
- Play completed voice segment
- Download completed voice segment


## Input

- Room identity
- Teacher identity
- Student identity
- Live voice session request
- Voice session control
- Audio stream


## Output

- Live voice session
- Session status
- Audio segment
- Audio artifact
- Playback capability
- Download capability


## Participants

### Teacher

The teacher is the primary publisher of live voice.

The teacher may:

- start a live voice session
- speak to learners
- stop the live voice session
- create a completed audio segment


### Student

Students are listeners by default.

Students may:

- join a live voice session
- receive teacher audio
- listen to the live voice
- access completed audio segments
- download authorized audio segments

Student microphone publishing is disabled by default
in version 0.1.0.


## Realtime Architecture

SBBox-LIS-LiveVoice does not use the LIS Room REST API
as the media transport layer.

Realtime audio transport is delegated to a dedicated
realtime media infrastructure based on WebRTC/SFU.

The LIS application remains responsible for:

- identity
- authorization
- room association
- session state
- learning metadata
- artifact metadata


## Session Model

A voice session follows:

Teacher START
→ Live Voice Session
→ Teacher STOP
→ Audio Segment


Example:

Audio Segment #001

Start:
10:03:21

End:
10:07:48

Duration:
4m27s


## Audio Artifact

A completed voice session may produce an
Audio Artifact.

The artifact may contain:

- audio segment identifier
- room identifier
- teacher identifier
- start time
- end time
- duration
- storage reference
- creation timestamp


## Learning Data

The Smart Box distinguishes between:

- realtime media
- audio artifacts
- learning evidence
- future knowledge representations

The raw audio artifact is not automatically considered
knowledge.

Future processing may transform:

Audio
→ Transcript
→ Learning Evidence
→ Knowledge Atoms


## Privacy and Ownership

SBBox-LIS-LiveVoice follows the principle:

"LIS does not necessarily need to store all data
created by LIS."

Realtime communication and learning artifacts may be
stored separately from the LIS core database.

The LIS core should retain only the metadata and
references necessary for learning orchestration,
authorization, governance, and future processing.


## Integration

SBBox-LIS-LiveVoice is designed to operate together
with SBBox-LIS-Room.

SBBox-LIS-Room provides:

- learning room
- membership
- teacher/student interaction
- message stream

SBBox-LIS-LiveVoice provides:

- realtime teacher voice
- voice session
- audio segment


## Future Evolution

Future versions may include:

- server-side recording
- speech-to-text transcription
- knowledge extraction
- learning evidence extraction
- Student Learning Profile integration
- Knowledge Graph integration
- AI learning assistant
- Living Book integration
- personalized learning
- multilingual transcription
- searchable audio knowledge