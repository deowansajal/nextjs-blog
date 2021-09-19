import { useState, useEffect } from 'react'

import Notification from '../ui/notification'
import classes from './contact-form.module.css'

const sendContactData = async contactDetails => {
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactDetails),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message || 'something went wrong')
    }
}

function ContactForm() {
    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredName, setEnteredName] = useState('')
    const [enteredMessage, setEnteredMessage] = useState('')
    const [requestStatus, setRequestStatus] = useState()
    const [requestError, setRequestError] = useState()

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null)
                setRequestError(null)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [requestStatus])

    const sendMessageHandler = async e => {
        e.preventDefault()

        setRequestStatus('pending')

        try {
            await sendContactData({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage,
            })
            setRequestStatus('success')
            setEnteredName('')
            setEnteredEmail('')
            setEnteredMessage('')
        } catch (error) {
            setRequestStatus('error')
            setRequestError(error.message)
        }
    }

    let notification

    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'Pending',
            message: 'Message sending....',
        }
    }

    if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success',
            message: 'Message sent successfully',
        }
    }
    if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Error',
            message: requestError,
        }
    }

    return (
        <section className={classes.contact}>
            <h1>How can i help you</h1>
            <form onSubmit={sendMessageHandler} className={classes.form}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input
                            onChange={e => setEnteredEmail(e.target.value)}
                            value={enteredEmail}
                            type="email"
                            required
                            id="email"
                        />
                    </div>

                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input
                            onChange={e => setEnteredName(e.target.value)}
                            value={enteredName}
                            type="text"
                            required
                            id="name"
                        />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        onChange={e => setEnteredMessage(e.target.value)}
                        value={enteredMessage}
                        id="message"
                        rows="5"
                        required
                    />
                </div>
                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>

            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
        </section>
    )
}

export default ContactForm
