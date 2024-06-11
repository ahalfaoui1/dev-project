INSERT INTO crm_roles (name) VALUES ('ADMIN');
INSERT INTO crm_roles (name) VALUES ('USER');
INSERT INTO crm_roles  (name) VALUES ('CONTACT');
INSERT INTO crm_roles  (name) VALUES ('COMMERCIAL');

INSERT INTO crm_users (id, email, enabled, firstname, image, lastname, password, reset_password_token, username, role_id)
VALUES 
   (1, 'user1@example.com', true, 'John', 'image1.jpg', 'Doe', '$2a$10$cTUErxQqYVyU2qmQGIktpup5chLEdhD2zpzNEyYqmxrHHJbSNDOG.', 'reset_token_1', 'admincrm', 1),
   (2, 'user2@example.com', true, 'Jane', 'image2.jpg', 'Doe', '$2a$10$cTUErxQqYVyU2qmQGIktpup5chLEdhD2zpzNEyYqmxrHHJbSNDOG.', 'reset_token_2', 'usercrm', 2),
   (3, 'user3@example.com', true, 'Bob', 'image3.jpg', 'Smith', '$2a$10$cTUErxQqYVyU2qmQGIktpup5chLEdhD2zpzNEyYqmxrHHJbSNDOG.', 'reset_token_3', 'contactcrm', 3);
  