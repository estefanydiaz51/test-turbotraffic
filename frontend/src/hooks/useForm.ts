import React, { useState } from "react"

const useForm = (initialForm:any = {}) => {

	const [form, setForm] = useState(initialForm)


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setForm({
      name: value
    })
  }

  return {
		...form,
    form,
		setForm,
		handleChange,
	}
}

export default useForm
