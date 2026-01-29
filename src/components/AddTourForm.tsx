import { useState } from 'react'
import type { AddTourInput } from '../types/tour'

interface AddTourFormProps {
  onSubmit: (data: AddTourInput) => void
  onCancel: () => void
}

export function AddTourForm({ onSubmit, onCancel }: AddTourFormProps) {
  const [imageUrl, setImageUrl] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [creatorName, setCreatorName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ imageUrl, name, description, date, creatorName })
  }

  return (
    <div className="add-tour-overlay" onClick={onCancel}>
      <div className="add-tour-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Add Tour</h2>
        <form onSubmit={handleSubmit} className="add-tour-form">
          <label>
            Image URL
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              required
            />
          </label>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tour name"
              required
            />
          </label>
          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the tour..."
              rows={3}
              required
            />
          </label>
          <label>
            Date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label>
            Creator name
            <input
              type="text"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
              placeholder="Your name"
              required
            />
          </label>
          <div className="add-tour-actions">
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit">Add Tour</button>
          </div>
        </form>
      </div>
    </div>
  )
}




  // return (
  //   <div className="add-tour-overlay" onClick={onCancel}>
  //     <div className="add-tour-modal" onClick={(e) => e.stopPropagation()}>
  //       <h2>Add Tour</h2>
  //       <form onSubmit={handleSubmit} className="add-tour-form">
  //         <InputField label="Image URL" type="url" value={imageUrl} onChange={setImageUrl} placeholder="https://..." required />
  //         <InputField label="Name" value={name} onChange={setName} placeholder="Tour name" required />
  //         <InputField label="Description" type="textarea" value={description} onChange={setDescription} placeholder="Describe the tour..." rows={3} required />
  //         <InputField label="Date" type="date" value={date} onChange={setDate} required />
  //         <InputField label="Creator name" value={creatorName} onChange={setCreatorName} placeholder="Your name" required />
          
  //         <div className="add-tour-actions">
  //           <button type="button" onClick={onCancel}>Cancel</button>
  //           <button type="submit">Add Tour</button>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // )