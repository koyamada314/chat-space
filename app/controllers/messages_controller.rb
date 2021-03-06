class MessagesController < ApplicationController
  
  before_action :set_group

  def index
  	@message = Message.new
    @messages = @group.messages.includes(:user)
      respond_to do |format|
        format.html
        format.json { @newmessages = @group.messages.where('id > ?', params[:message][:id] ).includes(:user) }
      end
  end

  def create
    @message = @group.messages.new(message_params)
    respond_to do |format|
      format.html { if @message.save(message_params)
                        redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
                    else
                      @messages = @group.messages.includes(:user)
                      flash.now[:alert] = 'メッセージを入力してください'
                      render :index
                    end
                  }
      format.json { @message.save(message_params) }
    end
  end

  private
  def message_params
  	params.require(:message).permit(:body,:image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
    @users = @group.users
  end

end
