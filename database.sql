CREATE DATABASE IF NOT EXISTS racgu_website CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE racgu_website;

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  profile_json JSON NOT NULL,
  active TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 100,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS content_items (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  type ENUM('events','documents','notices','gallery') NOT NULL,
  item_id VARCHAR(64) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_content_item (type, item_id),
  KEY idx_type_created (type, created_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS registrations (
  id VARCHAR(64) PRIMARY KEY,
  event_id VARCHAR(64) NOT NULL,
  payload JSON NOT NULL,
  member_email VARCHAR(190) GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(payload, '$.memberEmail'))) STORED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_event_email (event_id, member_email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(40) NOT NULL DEFAULT '',
  subject VARCHAR(190) NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  status ENUM('new','read','replied') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO content_items (type,item_id,payload) VALUES
('events','ev-charter','{"id":"ev-charter","title":"Charter Ceremony","theme":"Insight to Impact","category":"Club Service","date":"2026-04-28","time":"2:30 PM","location":"Multipurpose Hall, Gandaki University","chairperson":"Rtr. Prabhab Tiwari","description":"Official charter ceremony of the Rotaract Club of Gandaki University.","image":"/assets/racgu-letterhead.png","status":"completed","maxSeats":100,"registeredMembers":[],"createdAt":"2026-01-22T00:00:00+05:45"}'),
('notices','not-welcome','{"id":"not-welcome","title":"Welcome to Rotaract Club of Gandaki University","refNo":"RACGU/RY26-27/001","issuedBy":"Club Secretariat","date":"2026-09-20","category":"General","content":"Our club works to build a resilient and sustainable student-led institution through strategic recruitment, meaningful engagement, leadership development and community service.","isUrgent":false}')
ON DUPLICATE KEY UPDATE payload=VALUES(payload);
