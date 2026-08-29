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

-- Do not seed deployable credentials. Create the first administrator through
-- a deployment-only bootstrap process with a unique, high-entropy password.
