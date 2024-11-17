import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from 'flowbite-react'
import CustomNavbar from './components/CustomNavbar'
import HeroSection from './components/hero/HeroSection'
import FeatureSection from './components/hero/FeatureSection'
import CoursesSection from './components/hero/CoursesSection'
import TestimonialSection from './components/hero/TestimonialSection'
import BenefitsSection from './components/hero/BenifitsSection'
import FAQSection from './components/hero/FAQSection'
import Footer from "./components/Footer";
import { Helmet } from 'react-helmet'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Helmet>
            <title>Learning Application | Mindup</title>
        </Helmet>
        <HeroSection />
        <FeatureSection />
        <CoursesSection />
        <TestimonialSection />
        <BenefitsSection />
        <FAQSection />
        <Footer />
      </div>
       
    </>
  )
}

export default App
