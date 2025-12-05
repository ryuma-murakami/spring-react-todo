DROP TABLE IF EXISTS tasks;
DROP TYPE IF EXISTS task_status;

CREATE TYPE task_status AS ENUM (
	'not_started',
	'completed',
	'trashed'
);

CREATE TABLE tasks (
	id UUID PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	status task_status NOT NULL DEFAULT 'not_started',
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
	updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now()
);
