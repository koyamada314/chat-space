# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## DB設計

* group_userテーブル

| Column | Type  | Options                      |
|--------|-------|------------------------------|
|user_id |integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

> Association
> - belongs_to :group
> - belongs_to :user

* groupsテーブル

|Column        |Type   |Option       |
|--------------|-------|-------------|
|group_name    |string |null: false  |

> Association
> - has_many :members
> - has_many :users, :through => :members
> - has_many :messages

* usersテーブル

|Column  | Type   | Option                    |
|--------|--------|---------------------------|
|name    | string | null: false, unique: true |
|email   | string | null: flase, unique: true |
|password|varchar | null: false, unique: true |

> - add_index: usersテーブル, [:name, :email]

> Associasion
> - has_many :members
> - has_many :groups, :trough => :members
> - has_many :messages

* messageテーブル

|Column  |Type     |Option                         |
|--------|---------|-------------------------------|
|body    | string  | null: false                   |
|image   | string  |                               |
|group_id| integer | null: false, foreign_key: true|
|user_id | integer | null: false, foreign_key: true|

> Association
> - belongs_to :user
> - belongs_to :group
