class MessagesController < ApplicationController

def index
end

def new
  @message = Message.new
end

def create
  Message.create(text: message_params[:text], image: message_params[:image], user_id: current_user.id)
end

private
def message_params
	params.require(:message).permit(:text, :image)
end

end
