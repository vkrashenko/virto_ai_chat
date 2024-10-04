from backend.chainlit.message import AskUserMessage, Message
from chainlit import on_chat_start

@on_chat_start
async def main():
    pass
    res = await AskUserMessage(content="Hello! How can I assist you today?", timeout=30).send()
    if res:
        await Message(
            content=f"Let's get started!",
        ).send()
