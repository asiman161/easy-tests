# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170422232600) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "completed_tests", force: :cascade do |t|
    t.string   "test_rate",      default: "-1",  null: false
    t.boolean  "first_complete", default: false
    t.integer  "group_id"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.integer  "user_id",                        null: false
    t.integer  "test_id",                        null: false
    t.string   "answers",        default: [],    null: false, array: true
    t.integer  "test_type",      default: 0,     null: false
    t.integer  "variant",        default: 0,     null: false
  end

  create_table "groups", force: :cascade do |t|
    t.string   "group_name",               null: false
    t.integer  "group_age",  default: 0
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "key",        default: "0", null: false
    t.integer  "user_id",    default: 0,   null: false
    t.index ["key"], name: "index_groups_on_key", unique: true, using: :btree
  end

  create_table "groups_subjects", force: :cascade do |t|
    t.integer "group_id"
    t.integer "subject_id"
  end

  create_table "groups_tests", id: false, force: :cascade do |t|
    t.integer "group_id"
    t.integer "test_id"
  end

  create_table "groups_users", force: :cascade do |t|
    t.integer "group_id"
    t.integer "user_id"
  end

  create_table "rates", force: :cascade do |t|
    t.integer  "rate",       default: 0
    t.integer  "subject_id",             null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "rates_users", force: :cascade do |t|
    t.integer "rate_id"
    t.integer "user_id"
  end

  create_table "subjects", force: :cascade do |t|
    t.string   "subject_name", null: false
    t.integer  "user_id",      null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "tests", force: :cascade do |t|
    t.json     "test_data",                  null: false
    t.bigint   "time_end",   default: 0
    t.boolean  "show_test",  default: false
    t.integer  "user_id",                    null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "subject_id",                 null: false
    t.string   "test_name",  default: "",    null: false
    t.integer  "answers",                                 array: true
    t.integer  "test_type",  default: 0,     null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string   "email"
    t.integer  "role",                   default: 0
    t.string   "first_name",             default: ""
    t.string   "last_name",              default: ""
    t.string   "patronymic",             default: ""
    t.string   "image"
    t.json     "tokens"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.integer  "group_id"
    t.string   "key"
    t.index ["email"], name: "index_users_on_email", using: :btree
    t.index ["key"], name: "index_users_on_key", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree
  end

end
