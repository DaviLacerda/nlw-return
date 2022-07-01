import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "114f3d166f8ace",
      pass: "885aae2791db94"
    }
  });

app.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    const feedback = await prisma.feedback.create({
        data:{
            type,
            comment,
            screenshot
        }
    })

    await transport.sendMail({
        from: 'Feedget | <oi@feedget.com>',
        to: 'Davi Lacerda <dlacerda9@gmail.com>',
        subject: 'Feedback do usuário',
        html: [
            '<div style="font-family: sans-serif; font-size:16px; color:#222;">',
            `<p>Tipo: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            '</div>'
        ].join('\n')
    })
    
    return res.status(201).json({ data: feedback })
})

app.listen(3333, () => {
    console.log('Server started on port 3333')
})