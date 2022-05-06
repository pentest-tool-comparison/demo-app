USE demoapp;

INSERT INTO userdata (username, is_admin, pw_md5, pw_sha1, pw_bcrypt) VALUES ("max", false, "81dc9bdb52d04dc20036dbd8313ed055", "7110eda4d09e062aa5e4a390b0a572ac0d2c0220", "$2a$12$PmIOv7q6rGz5ixF0tr/OeO8BhFuluZZlZ7YPg0VDbYg9w57tpQAsm");
INSERT INTO userdata (username, is_admin, pw_md5, pw_sha1, pw_bcrypt) VALUES ("Robot1337", false, "f0f447b83e6c75c208ea484abf78cb46", "9851339e42869653ce567c582c68793f8f4d7f0c", "$2a$12$.xmwtgN3AFAgGr.nuwY7NumWYzDV1qaVKdJ6uKGgVfa4uUBiqkSl.");
INSERT INTO userdata (username, is_admin, pw_md5, pw_sha1, pw_bcrypt) VALUES ("admin", true, "d8e855227d86147e0ac0a32e41f1417e", "f5af3d14b1505be8c9cf9a4de7c4316a039aed5c", "$2a$12$PH4VXpnuaBT32bdMIXBe0.fhVOtUTku4iOoJkLOANCrFyIAb1qxtO");

INSERT INTO items (name, price, imgurl) VALUES ("Blueberry Muffin", 13.37 ,"https://cdn.gutekueche.de/upload/rezept/18981/blueberry-muffins.jpg");
INSERT INTO items (name, price, imgurl) VALUES ("Chocolate Donut ", 4.20 ,"/uploads/schokoladen-donuts.webp");

INSERT INTO comments (item_id, title, body) VALUES (1, "Test", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.");
INSERT INTO comments (item_id, title, body) VALUES (1, "Test2", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.");
INSERT INTO comments (item_id, title, body) VALUES (2, "Test3", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.");
INSERT INTO comments (item_id, title, body) VALUES (2, "Test4", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.");
INSERT INTO comments (item_id, title, body) VALUES (2, "Test5", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.");