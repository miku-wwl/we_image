CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO public.users (user_id, name) VALUES (1, 'Jokcy')