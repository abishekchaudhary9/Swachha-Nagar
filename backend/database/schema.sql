-- ============================================================
-- Swachha Nagar — Database Schema (MariaDB / MySQL compatible)
-- ============================================================

CREATE DATABASE IF NOT EXISTS swachha_nagar
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE swachha_nagar;

-- ─────────────────────────────────────────────────────────────
-- 1. Staff Users
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS staff_users (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(120)  NOT NULL,
  email         VARCHAR(191)  NOT NULL UNIQUE,
  password_hash VARCHAR(255)  NOT NULL,
  role          ENUM('admin','field_officer','sanitation_worker') NOT NULL DEFAULT 'sanitation_worker',
  ward          VARCHAR(60)   NULL,
  created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────────────────────
-- 2. Reports
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reports (
  id                    INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tracking_code         VARCHAR(12)   NOT NULL UNIQUE,
  category              ENUM('organic','plastic','e_waste','construction','other') NOT NULL,
  description           TEXT          NULL,
  photo_path            VARCHAR(500)  NULL,
  resolution_photo_path VARCHAR(500)  NULL,
  location              POINT         NOT NULL,
  ward                  VARCHAR(60)   NULL,
  reporter_email        VARCHAR(191)  NULL,
  status                ENUM('submitted','acknowledged','in_progress','resolved','closed')
                                      NOT NULL DEFAULT 'submitted',
  assigned_to           INT UNSIGNED  NULL,
  is_disputed           BOOLEAN       NOT NULL DEFAULT FALSE,
  dispute_reason        TEXT          NULL,
  created_at            DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at            DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_reports_assigned
    FOREIGN KEY (assigned_to) REFERENCES staff_users(id)
    ON UPDATE CASCADE ON DELETE SET NULL,

  -- Spatial index for location-based search
  SPATIAL INDEX sx_location (location)
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────────────────────
-- 3. Report Status History (drives timeline + email triggers)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS report_status_history (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  report_id   INT UNSIGNED NOT NULL,
  status      ENUM('submitted','acknowledged','in_progress','resolved','closed') NOT NULL,
  changed_by  INT UNSIGNED NULL,           -- NULL = citizen (system-generated on submit)
  note        TEXT         NULL,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_history_report
    FOREIGN KEY (report_id) REFERENCES reports(id)
    ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT fk_history_user
    FOREIGN KEY (changed_by) REFERENCES staff_users(id)
    ON UPDATE CASCADE ON DELETE SET NULL,

  INDEX idx_history_report_id (report_id)
) ENGINE=InnoDB;

-- ─────────────────────────────────────────────────────────────
-- Demo Staff Accounts (.com domain)
-- ─────────────────────────────────────────────────────────────

-- 1. System Admin (Password: Admin@1234)
INSERT INTO staff_users (id, name, email, password_hash, role, ward)
VALUES (
  1,
  'System Admin',
  'admin@swachhanagar.com',
  '$2a$10$QmtprOaHpoLE.zUwnNpHk.eh7oSmqSzpwqD1f.KIQf6GfNEz.TLya',
  'admin',
  NULL
) ON DUPLICATE KEY UPDATE email='admin@swachhanagar.com', password_hash='$2a$10$QmtprOaHpoLE.zUwnNpHk.eh7oSmqSzpwqD1f.KIQf6GfNEz.TLya', role='admin';

-- 2. Sanitation Worker (Password: Staff@1234)
INSERT INTO staff_users (id, name, email, password_hash, role, ward)
VALUES (
  2,
  'Sanitation Worker Bahadur',
  'staff@swachhanagar.com',
  '$2a$10$ZZOCO5RHXxY2QJ9NA5PaDO9WowxEqPgOyACxRPIUUOEH7Cw.j7oxa',
  'sanitation_worker',
  'Ward 12'
) ON DUPLICATE KEY UPDATE email='staff@swachhanagar.com', password_hash='$2a$10$ZZOCO5RHXxY2QJ9NA5PaDO9WowxEqPgOyACxRPIUUOEH7Cw.j7oxa', role='sanitation_worker', ward='Ward 12';

-- 3. Field Officer (Password: Officer@1234)
INSERT INTO staff_users (id, name, email, password_hash, role, ward)
VALUES (
  3,
  'Field Officer Ram',
  'officer@swachhanagar.com',
  '$2a$10$dxrl..ewgGyJFPCtzvN0Fuj0yd2E/QAAzv15sI1f84Z.CsDiYQlY6',
  'field_officer',
  'Ward 12'
) ON DUPLICATE KEY UPDATE email='officer@swachhanagar.com', password_hash='$2a$10$dxrl..ewgGyJFPCtzvN0Fuj0yd2E/QAAzv15sI1f84Z.CsDiYQlY6', role='field_officer', ward='Ward 12';
