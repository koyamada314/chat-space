class GroupsController < ApplicationController

  def index
  end

  def cerate
  	Group.cerate(group_name: group_params[:group_name], user_id: current_user.id)
  end

  def new
  	@group = Group.new
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
  	group = Group.find(prams[:id])
  	if group.user_id = current_user.id
  		group.update(group_params)
  	end
  	redirect_to :index
  end


  private
  def group_params
  	params.require(:group).permit(:group_name)
  end

end
