import { userRequired } from "@/action/user/user-auth"
import { getUserWorkspaces } from "@/action/workspace/get-user-workspaces"
import OnboardingForm from "@/components/custom/onboarding-form"
import { redirect } from "next/navigation"


const OnboardingPage = async () => {
  const {data} = await getUserWorkspaces();
  const {user} = await userRequired();
  const name = `${user?.given_name || ''} ${user?.family_name || ''}`

  // If the user has completed onboarding, redirect to workspace page
  if(data?.onboardingCompleted && data?.workspaces.length > 0){
    redirect('/workspace')
  }
  // if the user has not completed onboarding, redirect to create workspace
  else if(data?.onboardingCompleted){
    redirect('/create-workspace')
  }
  return (
    <div>
      <OnboardingForm
      name = {name}
      email = {user?.email as string}
      image = {user?.picture as string} />
    </div>
  )
}

export default OnboardingPage