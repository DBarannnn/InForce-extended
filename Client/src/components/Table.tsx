import "./Table.css"
import {Form} from "react-router-dom"

export default function Table(){
    return(
        <>
            {/*
            -Add loader to ensure security 
            -Make req on server to get urls
            -Map url into components
            */
            }
            <section className="table-section">
                <h2>Add new URL</h2>
                {/*
                    Add action on this form to submit the link
                */}
                <Form className="add-url-form">
                    <input type="text" name="link" placeholder="Paste Your Long URL" className="url-input"></input>
                    <button className="shorten-btn">Shorten</button>
                </Form>
            </section>

            <section className="table-section">
                <h2>Listed URLS:</h2>
                <p>Urls should go here</p>
                {/*
                    Load data from Server and put here Every item should have link on details
                    ensure deletion made by user that has rights to
                */}
                
            </section>

        </>
    )
}