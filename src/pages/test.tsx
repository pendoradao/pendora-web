// This is a test page to test the UI components
import { useState } from "react";
import { NextPage } from "next";

import { ThumbUpIcon } from "@heroicons/react/solid";
import { Button, GridLayout, GridItemMain } from "@components/ui";
import { IS_PRODUCTION } from "@constants";

const ButtonArea = () => {
  const variants = [
    'primary', 'secondary', 'success', 'warning', 'info', 'danger',
  ]
  const sizes = [
    'sm', 'md', 'lg',
  ]
  const [loading, setLoading] = useState(false)
  const handleClick = () => {
    setLoading(true)
  }
  const handlerReset = () => {
    setLoading(false)
  }
  return (
    <>
      <h1 className="text-2xl font-bold">Button</h1>
      <div className="flex flex-col gap-8">
        <div>
          {
            //@ts-ignore
            variants.map((variant) => (
              <div className="flex gap-8 mt-4">
                <Button variant={variant}>Test Button</Button>
                <Button variant={variant} outline>Test Button</Button>
                <Button variant={variant} light>Test Button</Button>
                <span>{variant}</span>
              </div>
            ))
          }
        </div>
        <div className="flex gap-8">
          {
            //@ts-ignore
            sizes.map((size) => (<Button size={size}>{size} Button</Button>))
          }
        </div>
        <div className="flex gap-8">
          <Button icon="👍">Test Button</Button>
          <Button icon={<ThumbUpIcon />} variant="success">Test Button</Button>
        </div>
        <div className="flex gap-8">
          <Button disabled>disabled </Button>
          <Button disabled outline>disabled </Button>
          <Button loading variant="secondary">loading </Button>
          <Button loading variant="primary" outline>loading </Button>
        </div>
        <div className="flex gap-8">
          <Button onClick={handleClick} loading={loading}>Clickable</Button>
          <Button onClick={handleClick} loading={loading} icon={<ThumbUpIcon />} variant="secondary">Clickable</Button>
          <Button onClick={handlerReset} outline>Reset</Button>
        </div>
      </div>
    </>
  )
}

const TestPage: NextPage = () => {

  if (IS_PRODUCTION) { return null }

  return (
    <GridLayout>
      <GridItemMain>
        <div>
          <ButtonArea />
        </div>
      </GridItemMain>
    </GridLayout>
  )
}

export default TestPage;