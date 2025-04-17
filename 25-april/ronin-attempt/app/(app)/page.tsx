import Navbar from "./components/Navbar"
import PromptComponent from "./components/PromptComponent"
import Pricing from "./components/Pricing"
import Footer from "./components/Footer"

export default function Page() {
  return (
    <div className="bg-background text-foreground w-full h-screen">
      <Navbar />
      {true && (
        <div className="bg-inherit text-white w-full max-w-sm mx-auto rounded-4xl text-center text-xs mt-5 border border-neutral-700 py-2">
          <p>This website is currently being worked on.</p>
          <p>Nothing works yet. Release coming soon!</p>
        </div>
      )}
      <PromptComponent />
      <Pricing />
      <Footer />
    </div>
  )
}
