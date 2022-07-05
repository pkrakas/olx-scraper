async function scrapeOffers() {
    const offerAnchors = $("div[data-cy='l-card'] a").toArray()
    const offers = offerAnchors.map(offer => {
        const url = offer.href
        textSplit = offer.innerText.split('\n\n')
        const title = textSplit[0].split('\n')[1] || textSplit[0]
        const price = textSplit[1].split('\n')[0]
        const location = textSplit[2].split('-')[0].trim()

        return {
            url,
            title,
            price,
            location
        }
    })

    
    
}

async function runScraper() {

    console.log('Scraper started.')

    let nextPageAnchor

    while (nextPageAnchor = $("a[data-cy='pagination-forward']")[0]) {

        await scrapeOffers()

        nextPageAnchor.click()
        await waitForElement('div[data-testid="listing-grid"]')
        await timeout()
    }

    await scrapeOffers() // last page

    console.log('Scraper task completed.')
}

function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

async function timeout() {
    return new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 3000) + 2000)) // Between 2-5s
}

(() => {

    const jqueryScript = document.createElement('script')
    jqueryScript.type = 'text/javascript'
    jqueryScript.async = false
    jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js'
    document.getElementsByTagName('head')[0].appendChild(jqueryScript)

    jqueryScript.addEventListener('load', runScraper)

})()

