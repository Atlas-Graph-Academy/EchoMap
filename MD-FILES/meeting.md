Meeting Title: Map design and feature prioritization for Echo app
Date: Dec 16

Transcript:
 
Them: And in fact, managing trying to manage them together would be complicated. So what I did is basically just  
Me: Okay.  
Them: understand what how how stickers is being the in the map and then change the style. Directly.
  
Me: Okay. So because my memory was not updated, it was at the point when I to you when you say, okay. We are going to replace the memory sticker on the map with our unified component.  
Them: Yeah. If you look at this channel, I send a follow-up message.  
Me: Yeah. Okay. Let me see.  
Them: But basically, if I can try to explain to you if you want a  
Me: Okay.  
Them: spoken version of that.  
Me: Okay. Okay. I saw the follow-up message. Okay. Boneless.  
Them: That's the important part. The stickers' visual design, the motion behavior, and a container for the  
Me: Yeah.  
Them: stickers. That's the bundle that we used to have.  
Me: I see.  
Them: But in the map, we just have the sticker itself. So there's no reason to mix them together.  
Me: I understand. Makes sense. Yeah.  
Them: And it's not too complex. The previous reason of having the guest and owner view is that when we call the memory detail, we're just setting the is owner to false instead of having a Boolean check. And now after I edit that line, it's fine. So it's not something very complex.  
Me: Cool. Aligned.  
Them: Yep.  
Me: Yeah.  
Them: Okay.  
Me: Ray, I'm using the new build, and it it indeed much better than before. In the auto Do you think the same way? In the auto peer message, when we have the the keyboard off. Yeah.  
Them: Yeah. Yes. I agree that, like, when Echo is replying, it's better to collapse the keyboard because you already have such a small area to fill the contents. Yeah.  
Me: If you  
Them: Yeah.  
Me: more more comfortable and easy to focus, Yeah. I talked with myself this morning using another account. It's really, it's really informative. And I think the problem is really good. It's definitely useful for our upcoming events. For sure. So that's good news. Cool. So the event card is the And For the map, I have, I think Eric and I had what, together with them, well. You know, conclusion, on how we want to display the elements, it will be similar to right note. Let me show you. Right. So this is right note. This is what we have. At the moment. So this morning, I had a new like, I think that's the last piece of of of this map either thinking, which is when the user land on the map, they should know clearly that there are many live people. With memories that I can find to talk to. Right? So they should know first, these are memories. Two, these are real people that I can talk to. Three, that I can actually talk to them. Right? Three things. So our current design here, like, number of memory number of people is better but still not clear. Enough. So to make this happen, what's in my mind is we have a opening animation. App opening animation. Anytime when you open the map, we play a short video full screen, thinking Netflix, Every time you open Netflix, that in. Uh-oh. That one. That is what I'm talking about. And that is a lending ceremony. It's like we are lending the user from the universe or from top of the earth to the city of San Francisco. And echo is following. And then in the end of that animation, the claws will fly away to leave you a clearer view of the city. On the top. And that's the end of the animation. And then comes the map and the map should be at the same level. To the last frame of the animation. So the user doesn't feel you know, it's the end of the animation. It feels smooth. And then I go start to so during this animation, I go tell, hey. We are landing to San Francisco. Together. There are 49 people that you can talk to with memories, and you can find their memories with me. And then we land here. And then this will be, you know, the user will see the light bulbs on the map. In the first. After the claws are gone, the animation is over. Echo would stop somewhere on the screen. And then this will light up. This is a beacon. And then this instead of just as picture, we should attach the memory sticker which is the the profile picture together with the name. On the map. The but that's just one. So this is the picture This is the memory sticker. Click the picture. We'll open up the picture full screen. But if you click the sticker, you can open up the memory detail page. Close the detail page, come back to this frame. Right? So this is a static screen. Of the map. And this is the highlighted memory and the beacon. And this is the name of the beacon. Name of the beacon. And the number of memories and people in this speaker. Today. And then when the users grow or pan, they can see this steamed and another beak could light up. And then this will be updated. To that beacon name. And then when you pull up, and this section would give you all of the memory stickers. As what we have on the map. Flowing River, in the vertical area the vertical card. Yeah. We could either flow or we we could pass the flow. No need to flow. If not necessary. Yeah. But we will see. How it look like. But this memory would basically stay inside this and make the user believe all and that is the area That is the beacon number. We're talking. And then this map becomes very easy to use. It's just beacon memory. Find memory. Check the detail. Talk to the people. And go back to the map. Find the map. Change the beacon. Yeah. And the search would be would be so you if you click I'm thinking to in include the search and change memory. These two functions should be around echo. If you tap echo, echo would say, do you want to find another memory? Yes. And then we will change this mode to another bandwidth, another bigger And the user said, no. This is cannot find anything. I would search and then they will pop up the search bar, and echo is with the search bar. Yeah. Similar to to to What will that I think echo would be flying on the screen. It's free for Echo. Yeah. We can set a section. I'm not too sure. Can discuss. We can set an area for, for example, if you look at this, we can reduce this part to make it smaller like the red note. And then echo could be here and this area is the main view port. For the user. So when we move the map to another beacon, basically, the map would move from here. To the center. Yeah. So this is the center area is used to display the beacon and the memory. Pictures.  
Them: I have two comments. I think in a system like this, a search function is really important. And if you hide it on Echo, it's not very intuitively for first time user or even, you know, to know that the search function is there. So I think it should be more visible or echo actually have a magnified glass. Attached to himself, like, the Nikon, so people know clicking him You can search. Secondly, I think the search function right now we have in the app it's not fully implemented. Right? So let's say you do CAT, c a t, You have a whole list of memory popped up not related to cat. If you click one of it, then you zoom into this the ZIP code, and the river of memories. That is not that that confuse the shit out of me because it's like, wait. I'm clicking one of the memory. Why are you taking me to a ZIP code? And then the river is flowing. I don't have control over it. I don't get you sometimes I don't get to pick the one I want I wanted to see.  
Me: Yeah.  
Them: So can we after the search, we click on the memory. It just immediately pop up the memory detail page.  
Me: Yes. Yes.  
Them: Instead of going to the ZIP code. Okay.  
Me: Yes. Does act it should be like this. But why we search CAD there are 86 result? What's the As such, it's just comparing. The more. Letter.  
Them: So it's so is that it's not matching semantically. So I is this something we can do about this search? Or if it's not ready, we should not pull it on the app because it's just really confusing.  
Me: Can you improve this search using text embedding? Basically, generate embedding for cat and use embedding. To match the the description embeddings. Could. But I think the search that we currently have is a local search. Right? Yeah. Based on the fetch data. It's directly searched in your edge device. Rather than making a new request, though. But it's also like, you make a request to OpenAI embedding model get that. We don't need don't even need to save that embedding. We just use that embedding to match with the description embedding Yeah. But that embedding, you wanna to be done in the app device. Right? Yeah.  
Them: I think at this moment, like, just matching  
Me: Yeah.  
Them: word, like, exact exact spelling is still better than this. Like, if someone's title memory title has pat in it, then we match that. It's still gonna make more sense. Like, instead of using embedding, because it's the limitation on logo, matching, then can we just match exactly the spelling either in the description or in the title? Yes.  
Me: You mean the word? We yeah. Yeah. We match the word.  
Them: Mhmm.  
Me: We don't match the letters. Yeah. Mhmm. Yeah. Yeah. I understand. I see. Yeah. That's better. Okay. I I don't think this search can be done by this week because I I wanna I wanna put more thoughts into the search. Right now.  
Them: So maybe we can just hide it for now because it just it the whole thing, it just throw me off. Like, it it's not ready.  
Me: Yeah.  
Them: We can hide a button or something.  
Me: Yeah. If we can make the beacon more discovered, with better display of the memories inside. People can use that list to find memories. Yeah. I think searches we can hide the search function for now. Yeah. And add it back later. Sounds cool. Oh, wait. Seven. Let's work on the land. So are are you aligned with the the lending concept? For the opening animation.  
Them: My question is how long is this animation? Because it if it's too long, it's kinda it's kinda too much excess if you open the app every time you play it.  
Me: Yeah. No more than three seconds, I will say. More than three seconds. Yeah. It's more like an impression. Yeah. Cool. That Cool. Let's do it. Seven, let's generate that. Do we have  
Them: Coby, do we have oops.  
Me: We can't have one, buddy. Let's find some materials. It's like landing on earth from space. To San Francisco. I think when Google launched the Google Glass, they had a view. Jumping from the space, landing on the venue. Yeah. What did you say, Michel?  
Them: I'm trying to ask if you have any plan about the memory flow. Memory lever. And the mob. Because I can, like, try to come up with some different version of it and see if we use our if we have more control over it, and etcetera, if you don't have something on it. Because I I do think this is not actually usable because if I wanna see, like,  
Me: Yeah. Yeah. Yeah.  
Them: this is  
Me: Yeah. Oh,  
Them: so  
Me: to remove that for now. We will put the memory in the pop up page for the beacon. Yeah. So that would not so on that on the map, it will be you know, blinking dots or lengthens on the mat. But not clickable. It's only for the atmosphere to tell you certain days are real manneries and real people. Yeah. But there's nothing more on the map. It will be just beacon. Beacon dots. And then click the beacon. You have the list of the memories. And if you don't click anything, you click echo, echo will give you new memories with the enlarged pictures. Yeah. In that mode. Browsing mode. Or yeah. K. So we're gonna have that That would be expensive. Right? Hot. I mean, here. In the future, we for sure, will want to have that the back. Because echo is Yeah. That would be great if you can have the autoimmune Rhyme is building that. He is going to have a jet backpack. Cool. Fly on the sky. Speak small. He's like, flat inside close to the map or close to the user. With that goggle and stuff. If not, we can leave a button there, pop up a new memory. Pop up a new memory. If the user click once, there will be a new memory pop up. Basically, the map to focus on another mammary to manner. Is This this mold. Yeah. So this this mode is all about one memory. And this piece is located here. On this beacon. And this description is about the beacon. And if you pull up, you can see all of the memories. On the beacon. And you you click a button to change another memory. If you zoom in, you can see more can see other beacon. This will disappear. Yeah. So like that. And yeah. So we do we don't need to put echo on this map for this week. Yeah. Cool. Alright. Align. For the manga, just do it. What do you mean? Just do it. I think we all love the the the manga you generated yesterday. That's amazing. It's it's just amazing. Two like, do you wanna apply the mom image for all sort 100 on the map? Or the top 30? Which is the top one. I would say we should prioritize ourself. Because that is a strong hook for user to read your memory and want to talk with the person. If you, you know, find this on map, but, like, after sand, will never receive any message from them. That's bad. So we should try at least you know, more than 50% of the manga are actually real people. Is us. Which well, not quite possible because in the current memory distribution, our team member has, like, seven memories. Among 30 fertile watt. So it's going to be less than like, 33%. So but then all the manga we generated yesterday is already stored. In the bucket. So it's not wasted. But then it's just the ratio of our team member compared with all the memory owners on the map is is just going to be below maybe, like, 25%. And that's that's that's not a problem. Though. If we have tier one memories, on our team, we can make manga for all of them. So all the gold miners as well. Right? Not all of the gold miners, sir. All of our public tier one memories. Tier one, tier two memories. Every our on our team. On our team. We generate manga for our team first. Yeah. It's already done. Everything. Oh, I mean, all of the memories. We have. Tier one, tier two. Yes. That's just tint memory? It's actually I think it's about 12. Or 15. But there's no way not in. The That's why I was saying the easiest way is you make a call saying, we produce manga for all the it's either tier one or tier one plus tier two, Because even for tier one plus tier two, it's going once we switch to Gemini 2.5 flash, then the cost would be, like, a dollar for 30 yeah. Yeah. A dollar for 30 Yes. Users. It's okay. Yeah. That's good. But did you try the quality of the 2.5? Yeah. Like, part of that is a little bit tricky because 3.5 does not quite follow the aspect ratio It mainly, follows the aspect ratio of the input. Image. Which is when the user has a like, a square, input image, then the output image will also be a square. Doesn't matter if you like, passing the parameter saying output, like, Three two. That's okay if because manga is about freestyle. Right? If if you share a different scale, it could make the map more active. Feels more active. The core is the content quality. Because the current quality is really emotional and attractive. Can we have the similar quality from 2.5? I saw a test at 2.5. I think the graphic quality is similar. But for the kind of let's say, overall quality, there's no way to guarantee that. Yeah. Because it it actually depends on the user's profile plus the Yeah. The text content. Yeah. And because if yeah. Yeah. Let's test. With another tune. The same. Use the same memory ID. From the memory in the in the channel. Let's compare. Because if the quality is not like that, then we would we would rather spend more money on on three. Yeah. Yeah. K. Yeah. Because this content is like nothing. Compared to, you know, other cost for marketing campaign. If we can make this really good, is this is worth. Yeah. Yeah. Let's try use the same ID. With another 10 Okay. Yeah. Using 2.5. Cool? Yeah. So I will I just created the a project in antigravity for this map. I will use that to come up with a high quality flow. And design. And you can start with it. I think it's it's easier for you to work on a final design. Yeah. Yeah. And the the event card, you need to optimize that. Usual. Cool. Alright. Any other stuff?  
Them: I have some question about the ticket for, integrating RANKS animation. Can you bring that up? Because I remember you just show us ones about a video of what Ram did. And like, share it to me or to the chat again so that I can refer. Because I I wasn't able to find that in REM's files, and I'm about to ask him  
Me: Yeah. It's probably not in the file. Let me see. I know what you are talking. About. This one  
Them: Yeah.  
Me: Yeah.  
Them: Because the ticket says,  
Me: I think none of these are updated in the file.  
Them: Yeah.  
Me: I see. I think this is the one.  
Them: Yeah.  
Me: Yeah. This one. Right? Yeah. Yeah. Yeah. I'll ask him.  
Them: Wait. Is this included in the ticket that you had?  
Me: Yes. To start EchoChat. So this one will be let's talk. Or echo asking the user, shall we have a like, do you wanna talk with me?  
Them: Wait. So I thought it's Wait. So I thought it's like there's the echo in the app. And we want to create a tapped feedback. When user tap on echo, it would give you three different state. Which is the echo chat state, the discovery search, and the default one. Is that correct?  
Me: Oh, Oh, so you want to use our front end to do this instead of echo. Animation.  
Them: No. That's one that's why I'm asking because  
Me: I see.  
Them: I have, like, no opinions on this, but I think just to clarify, this means that it's in act in in the write file. Right?  
Me: In the wrap.  
Them: Yeah. It would be much easier if it's in Rive.  
Me: Yes. Okay.  
Them: I'm honest.  
Me: Yeah. Yeah. Yeah. I think it's ready to use.  
Them: So these are the pop up when user click echo.  
Me: Yes.  
Them: Correct.  
Me: Yes.  
Them: And then the text, I should be able to change it.  
Me: Yes.  
Them: Based on different mode, and then I'll I'll make sure that Ryan knows. Okay.  
Me: Yeah.  
Them: Then I think I probably can't promise to finish it before Wednesday because, I I doubt it, but maybe because in order to work with this I need to make sure that rhyme has a listener to click for the pop up and then, you know, all that more engineering collaboration.  
Me: I see.  
Them: Has to be done.  
Me: Yeah.  
Them: So I I I doubt it that's being implemented already because it's, like, kind of trivial for him. It's, like, more of the engineering side. Issue.  
Me: Right. Okay. Yeah. It's really dependent. It should be so if the user let's say, if the user click echo, on map, echo echo is clicked. At that mode, can we pop up a window? On the screen, say, a model? Is a model asking the user, do you wanna talk with me? As the user said, no. And then close the model. Echo Click echo again. It will be you wanna change echo to another animation. At that mode, Animation. At that animation, click echo will pop up, like, do you want to find the memory? Yes. Find the memory. Like that. Use the model instead of the pop up on Revvim.  
Them: Yeah. That would be  
Me: Animation.  
Them: more dependent. Like so if that's the case, then we don't have to have RAM involved.  
Me: Okay. The Okay. Let's see if he replies. He usually replied pretty  
Them: I mean, like, what's  
Me: promptly.  
Them: what do we want in the future? Like,  
Me: We definitely want to have this on on echo. To make echo more  
Them: Because  
Me: like a person or interactive.  
Them: Because the thing is if we want a model defined from Flutter, that pop up would be very rigid and you know, it's not very position specific to where Echo locates, if that makes sense. So  
Me: Yes. Yes. It will be just in the center of the screen.  
Them: so yeah, we can, like, specifically put it on the right of aqua if that makes sense. So it has to be something large on the banner. It's like, you know so  
Me: Yes.  
Them: if that's what we want, then I can start implementing it. But if  
Me: Yeah.  
Them: we want a more  
Me: Is  
Them: like, it sounds like some some message from echo, then I think it's better to have it from Rod.  
Me: Yeah. It's better on the Rive. Is that possible Or I mean, you know, in right notes, when you search and there's nothing in result, they will give you a flashing banner or model. It's like no result. And then don't need to close it. It will just disappear. And leave you at the empty result page.  
Them: Yeah. Yeah. We have that. Like, we we after we save the door, save Historia, update something, we would have the banner, and then it will automatically It will disappear, disappear after, like, a few second.  
Me: Yeah.  
Them: If that's what you're talking.  
Me: Yeah. Okay. Cool. I got it. So it's it's easy  
Them: Yeah. It's easy.  
Me: to do. That. Right? Kinda okay. I see. Cool. I think even if Brian updates the file for you, you would need to think  
Them: And then text  
Me: we how to use them. Right?  
Them: And then text.  
Me: Yeah. Yeah. Let's so let's wait for him for because all we need all we want from this ticket is to make talking with echo easier. Because that's our entry to generate memories.  
Them: Okay.  
Me: Yeah. So if we cannot have a proper ride animation, suit for talking to me. Basically, that model from Rife like someone liked you, basically this one. You know? Yeah.  
Them: Okay.  
Me: If we can  
Them: Okay. I think then what I'm gonna do first because I think working with Ride takes  
Me: Hello?  
Them: a long time to know, like, what did he do, and then I need probably give him some instruction. About how to improve the ride in order for me to work it well.  
Me: Yeah.  
Them: So maybe at this point, I'm just gonna don't think about  
Me: The  
Them: Rive and only think about user actions and then get the most simple version. Working on the  
Me: Yeah.  
Them: app. And then I can based on, like, those experiment, I can go back to Rive and have  
Me: Yeah.  
Them: think about how to implement them in a better way.  
Me: That's perfect.  
Them: Okay.  
Me: That's the best. Yeah.  
Them: Because I think reading from the the ticket, I still have some decision to make about how to make this. Work. So I think I'm gonna  
Me: Yeah. Yeah. Yeah. Yeah.  
Them: do that today. Okay.  
Me: Yeah. Just allow user to be able to start a echo chat by clicking echo. And interact.  
Them: Yeah. So there's something like the discovery search and other  
Me: Yeah. So so  
Them: things. I think for now, I'm gonna focus on the Apple chat.  
Me: Echo chat. Search  
Them: Okay.  
Me: we are aligned to remove from this week.  
Them: Okay.  
Me: No search. Discovery would be, you know, part of new memory.  
Them: Okay.  
Me: Yeah.  
Them: Is this only on the map? Or also in  
Me: Only on the map.  
Them: okay.  
Me: Right now.  
Them: Cool. Got it. Thank you.  
Me: Cool. Perfect. Thank you for this. Nice. Alright. See you guys. Happy birthday. Bye bye. Oh, Michelle.  
Them: Eight,  
Me: Jeannie gave us how many boxes? Four. Four of decorations for Christmas. Four. This is so the decoration of Christmas is not started yet. Yeah. We are waiting for you to come and decorate take  
Them: Okay. I want to do my accent. I'll I'll come  
Me: Yeah.  
Them: Wait. When when is event? Starting?  
Me: Friday night, you can come Friday morning. After the meeting in the afternoon, and we will decorate together.  
Them: Okay. Sounds good.  
Me: Alright. Bye bye.  
Them: One thing. Sorry. I'm I'm trying to get the profile creation. Design into the this bill. You said we need to include the safety and the what are the photos, how they're being published, or you know the page I'm talking about. Right? To on doing onboarding, to ask people yeah.  
Me: Onboarding. Yes.  
Them: So what kind of message? Like, the you originally, you have a  
Me: In  
Them: a statement saying your safety is really important to us. You can block users. We will include that in a tooltip, so it'll be a popped up And then is there anything else you wanna include on that page?  
Me: This is the image uploading page. Right?  
Them: Yes.  
Me: It That's good. You you can describe in your  
Them: Okay.  
Me: mind. I trust you.  
Them: Okay. Thank you.  
Me: You can do better than that, actually.  
Them: Oh, no. The the part telling them, like, they're  
Me: Yeah.  
Them: how is the photo being used? I'm I'm still not clear because it looks like the the emotion photos are popped blick. By default, you don't get to hide it. So it's your profile picture. Right? So we don't really have to say anything like you  
Me: Yep.  
Them: you get the control to hire photos or not.  
Me: Yeah. Ring, just leave it a you know, a pop a pop up and leave all of this explanation in the pop up. And we can change the content inside later.  
Them: Okay. It's too clear. Yeah.  
Me: Yeah. Don't leave them on the page because otherwise, it creates the reading. Right?  
Them: Yeah. It's gonna be a two tip. Yeah.  
Me: Yeah.  
Them: Got it. Okay. I will just leave it there.  
Me: Yeah. Two  
Them: Thank you. Alright. Bye.  
Me: Perfect. Bye. Have a good day, guys. Recover soon. Bye bye.  
Them: You. Bye. Bye. You too.  
Me: Okay. 

