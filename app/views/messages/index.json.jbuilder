if @newmessages.present?
  json.array! @newmessages do |message|
    json.id  message.id
    json.posted_time  message.created_at
    json.user  message.user.name
    json.body  message.body
    json.image  message.image.url
  end
end