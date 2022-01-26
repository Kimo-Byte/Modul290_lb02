create table customer
(
    id         int auto_increment
        primary key,
    firstName  varchar(50) not null,
    lastName   varchar(50) not null,
    email      varchar(50) not null,
    phone      varchar(25) not null,
    password   varchar(25) not null,
    registered datetime    not null
)
    charset = utf8;

INSERT INTO contactdb.customer (id, firstName, lastName, email, phone, password, registered) VALUES (2, 'Kimo', 'Billeter', 'billeterk@bzz.ch', '+41781234567', 'ffdsddDf', '2022-01-26 16:03:25');
INSERT INTO contactdb.customer (id, firstName, lastName, email, phone, password, registered) VALUES (3, 'Fabio ', 'Bauleo', 'bauleof@bzz.ch', '+41794569898', 'FabioBauleo', '2022-01-26 16:11:38');
INSERT INTO contactdb.customer (id, firstName, lastName, email, phone, password, registered) VALUES (4, 'Fabio', 'Bauleo', 'bauleof@bzz.ch', '+41797485858', 'FabioBauleoooo', '2022-01-26 16:12:59');
INSERT INTO contactdb.customer (id, firstName, lastName, email, phone, password, registered) VALUES (5, 'Fabio', 'Bauleo', 'bauleof@bzz.ch', '+41797485858', 'FabioBauleoooo', '2022-01-26 16:15:03');
