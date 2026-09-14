# Rules — SBBox-LIS-Room

## 1. Purpose

Rules define the operational constraints,
permissions, responsibilities, and safety principles
of SBBox-LIS-Room.

Rules determine what the Smart Box is allowed to do,
what it must not do, and how it should evolve.

---

## 2. Role Model

SBBox-LIS-Room contains two primary roles:

### Teacher

The teacher is the owner or authorized manager
of the Learning Room.

The teacher may:

- Create a Learning Room
- Configure the Learning Room
- Generate an access link
- Generate a QR code
- Publish official messages
- Manage the learning communication flow

### Student

A student is a learner who accesses the Learning Room.

The student may:

- Access the Learning Room
- Read published messages
- Participate in learning activities defined
  by the teacher

In version 0.1, students cannot publish
official broadcast messages.

---

## 3. Authorization Rules

### Rule 3.1

Only an authorized teacher may create
and manage a Learning Room.

### Rule 3.2

Only the authorized teacher may publish
official broadcast messages.

### Rule 3.3

Students must not be able to modify
official teacher messages.

### Rule 3.4

Access to a Learning Room should be controlled
by the room's access mechanism.

---

## 4. Message Rules

### Rule 4.1

Every official message must have
an identifiable author.

### Rule 4.2

Every official message should preserve
its creation time.

### Rule 4.3

Published messages should not be silently modified.

If modification becomes necessary,
the system should preserve an appropriate
record of the change in future versions.

### Rule 4.4

The system must distinguish between:

```text
Official Message
      ≠
AI-generated Content
      ≠
Knowledge Candidate
      ≠
Validated Knowledge