CREATE TABLE rooms (
  room_id UUID PRIMARY KEY,
  room_name TEXT NOT NULL,
  teacher_identity TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL
    CHECK (status IN ('active', 'archived'))
);

CREATE TABLE room_memberships (
  room_id UUID NOT NULL,
  student_identity TEXT NOT NULL,
  joined_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL
    CHECK (status IN ('active', 'removed')),

  PRIMARY KEY (room_id, student_identity),

  CONSTRAINT room_memberships_room_id_fkey
    FOREIGN KEY (room_id)
    REFERENCES rooms(room_id)
    ON DELETE CASCADE
);