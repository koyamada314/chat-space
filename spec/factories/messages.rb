FactoryGirl.define do
  factory :message do
    body Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/no_img.png")
    user
    group
    created_at { Faker::Time.between(2.days.ago, Time.now, :all) }
  end
end