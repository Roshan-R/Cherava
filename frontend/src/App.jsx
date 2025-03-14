import { useState } from 'react'
import Input from './components/Input.jsx'
import Navbar from './components/Navbar.jsx'
import Button from './components/Button.jsx'
import './App.css'
import Preview from './components/Preview'
import { v4 as uuidv4 } from 'uuid';

import { Cron } from 'react-js-cron'
import 'react-js-cron/dist/styles.css'

import toast from 'react-hot-toast';

function App() {

    const [url, setUrl] = useState("");
    const [id, setId] = useState("");
    const [selector, setSelector] = useState("")
    const [type, setType] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [cron, setCron] = useState("")

    const [loading, setLoading] = useState(false)
    const [previewData, setPreviewData] = useState("")


    async function handlePreviewClick() {
        setLoading(true)
        const data = { url, selector, type }
        console.log(data)
        console.log(`${import.meta.env.VITE_BACKEND}`)
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/api/v1/scrape`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const json = await res.json();
        console.log(json)
        setPreviewData(json.d);
        setLoading(false);
        const idd = uuidv4()
        setId(idd)
    }


    async function SaveToDatabase() {
        const c = cron || "* * * * *";
        const workflow = {
            id,
            user: userId,
            data: previewData,
            selector,
            cron: c,
            lastupdated: Date.now(),
            url,
            name,
            email
        }
        console.log("workflow: ", workflow)
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/api/v1/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(workflow)
        })
        const respJson = await res.json();
        console.log(respJson)
        if (respJson.worked) {
            toast.success('Successfully saved to database')
        }
    }

    return (
        <div className="h-screen bg-gray-100">
            <Navbar />
            <div className="my-12 mx-20">
                <div className="text-4xl font-semibold">Add new website</div>
                <div className="my-7 grid grid-cols-2 w-full rounded-md bg-white px-1 py-4 shadow">


                    <div className="mx-4 flex flex-col justify-between gap-4">
                        <div className="flex-1 flex-col gap-2">
                            <Input
                                title="Name"
                                placeholer="example"
                                onChange={(e) => setName(e.target.value)}
                                defaultValue={name}
                            />
                            <Input
                                title="Website url"
                                placeholer="https://example.com"
                                onChange={(e) => setUrl(e.target.value)}
                                defaultValue={url}
                            />
                            <Input
                                title="CSS Selector"
                                placeholer="h1.title"
                                onChange={(e) => setSelector(e.target.value)}
                                defaultValue={selector}
                            />
                            <Input
                                title="Datatype (text/html)"
                                placeholer="text"
                                onChange={(e) => setType(e.target.value)}
                                defaultValue="text"
                            />
                            <Button onClick={handlePreviewClick} text="Preview" isLoading={loading} />
                        </div>
                    </div>



                    <div className='mx-4 flex flex-col'>
                        {previewData ?
                            <><p className='text-lg text-gray-600 font-semibold'> Preview of data scraped</p>

                                <Preview data={previewData} />
                                <Input
                                    title="Email for Notifications on Website Updates (comma separated for multiple emails)"
                                    placeholer="foo@bar.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    defaultValue=""
                                />
                                <p className='text-lg text-gray-600 font-semibold'>Update Interval</p>
                                <Cron value={cron} setValue={setCron} />

                                <Button text="Save" onClick={SaveToDatabase} isLoading={false} />
                            </>
                            : <></>
                        }
                    </div>
                </div>
            </div >
        </div >
    )
}

export default App;
