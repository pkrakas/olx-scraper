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

(() => {

    const jqueryScript = document.createElement('script')
    jqueryScript.type = 'text/javascript'
    jqueryScript.async = false
    jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js'
    document.getElementsByTagName('head')[0].appendChild(jqueryScript)

    jqueryScript.addEventListener('load', async () => {

        let nextPageAnchor

        while(nextPageAnchor = $("a[data-cy='pagination-forward']")[0]) {

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


            
            nextPageAnchor.click()
            await waitForElement('div[data-testid="listing-grid"]')

        }
        
    })

})()

