import OpenAI  from "openai"


const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


export default async (req) => {

    try {
        if(req.method != "POST"){
            return new Response("Method not allowed",
            {status: 405

            })
        }
    

        const {country} = await req.json()

        const response = await client.responses.create({

            model: "gpt-5-mini",
            input: `Write an informative  overwiew of this country of my geography app.
                    The overview should be 200 words or less.
            
                    Pleae include information about the demographics, cusisne, languages, and an interesting factoid.
                    
                    Country data: ${JSON.stringify(country)}`,



            
        })

        return Response.json({
            overview: response.output_text,
        })


    }
    catch (error) {
    console.error(error)


    return Response.json(
        {error: "Unable to generate country overview"},
        {status: 500}
    )
    }


}