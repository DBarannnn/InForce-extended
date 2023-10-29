import "./About.css"

export default function About(){
    return(
        <body>
        <div className="container">
            <section className="content">
                <h2 className="section-title">About the Algorithm</h2>
                <p className="section-text">
                    The URL Shortening Algorithm is a service that converts long, complex URLs into shorter, more manageable links. It allows for easier sharing and reduces the length of URLs for improved readability.
                </p>
                <h2 className="section-title">How It Works</h2>
                <ol className="list">
                    <li className="list-item">
                        <strong className="list-item-strong">Validation:</strong> The algorithm starts by validating the input URL to ensure it's a valid absolute URL.
                    </li>
                    <li className="list-item">
                        <strong className="list-item-strong">Generation:</strong> It then generates a unique, short part for the URL by selecting random characters from a predefined alphabet.
                    </li>
                    <li className="list-item">
                        <strong className="list-item-strong">Uniqueness Check:</strong> The algorithm checks if the generated short URL is unique by querying the database to prevent collisions.
                    </li>
                    <li className="list-item">
                        <strong className="list-item-strong">Shortened URL:</strong> Once a unique short URL is generated, it's associated with the original long URL.
                    </li>
                </ol>
            </section>
           
        </div>
    </body>
    )
}