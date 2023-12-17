import * as Discord from 'discord.js'
import * as Utils from '#src/utils/index.js'
import * as Schemas from '@repo/utils/schemas'


export default Utils.clientSlashCommand({
  data: new Discord.SlashCommandBuilder()
    .setName('catfact')
    .setDescription('Finds an interesting fact about cats.'),
  async execute(client, interaction) {

    const facts = [
      "Cats have five toes on their front paws, but only four toes on their back paws.",
      "Cats can jump up to six times their body length in a single bound.",
      "A group of cats is called a clowder.",
      "Cats have a flexible spine that allows them to rotate their bodies 180 degrees in any direction.",
      "A cat's brain is more similar to a human's brain than to a dog's brain.",
      "Cats have an excellent sense of balance due to their inner ear, which also allows them to always land on their feet.",
      "The world's richest cat is named Blackie and inherited $12.5 million from his owner.",
      "Cats have over 100 different vocal sounds, while dogs have only about 10.",
      "Cats can see in near darkness, thanks to their highly sensitive night vision.",
      "Cats are crepuscular, which means they are most active at dawn and dusk.",
      "Cats have been domesticated for over 4,000 years.",
      "A cat's nose is unique, much like a human's fingerprint.",
      "Cats spend up to one third of their waking hours grooming themselves.",
      "Cats purr at a frequency that promotes healing and relieves pain.",
      "The richest cat in the world is worth $13 million.",
      "Cats have a strong sense of smell and can detect odors up to 14 times better than humans.",
      "Cats are more sensitive to vibrations than humans and can detect earthquake tremors before humans can.",
      "Cats have a third eyelid, called a nictitating membrane, which helps keep their eyes moist and protected.",
      "The smallest cat on record weighed only 4 pounds.",
      "A cat's tongue is covered in tiny spines, called papillae, which help them groom themselves and lap up liquids more efficiently.",
      "Cats have retractable claws that help them climb and grip their prey.",
      "A cat's whiskers are highly sensitive and can detect even the slightest changes in air currents.",
      "Cats can jump up to seven times their height.",
      "Cats have a unique collarbone that allows them to fit through spaces as narrow as their head.",
      "Cats have been known to bring their owners gifts, such as dead rodents or birds, as a sign of affection.",
      "Cats have a powerful memory and can recall events from years ago.",
      "Cats are capable of recognizing their owner's voice and can distinguish it from other voices.",
      "Cats can sleep up to 16 hours a day.",
      "Cats are carnivores and require a diet high in protein.",
      "Cats have an excellent sense of taste and can distinguish between different flavors.",
      "Cats have a long and flexible spine that allows them to curl up into tight spaces.",
      "Cats have a unique digestive system that allows them to break down and absorb nutrients from meat more efficiently than other animals.",
      "Cats have a special claw that is used exclusively for grooming.",
      "Cats are able to tolerate extreme temperatures, both hot and cold.",
      "Cats have a keen sense of hearing and can hear sounds that are too high for humans to detect.",
      "Cats are fastidious animals and will spend hours grooming themselves and their companions.",
      "Cats have a keen sense of direction and can find their way home from miles away.",
      "Cats have been known to exhibit strange behaviors, such as kneading and head-butting, as a sign of affection.",
      "Cats have been known to predict earthquakes and other natural disasters.",
      "Cats have a highly sensitive sense of touch and can feel vibrations as subtle as a fly's footsteps.",
      "Cats are highly adaptable animals and can thrive in a wide range of environments, from urban apartments to rural farms.",
      "Cats have a natural instinct to hunt, even if they are well-fed pets.",
      "Cats can run up to 30 miles per hour.",
      "Cats are territorial animals and will mark their territory with urine or scratch marks.",
      "Cats have been known to form close bonds with other cats and animals, including dogs.",
      "Cats have a specialized jaw that allows them to easily crush and consume bones.",
      "Cats have a highly developed sense of balance, which allows them to walk on narrow surfaces and leap from high places with ease.",
      "Cats have excellent night vision and can see in almost complete darkness.",
      "Cats are independent animals and can be trained to use a litter box and perform other behaviors on their own.",
      "Cats have been bred for specific traits, resulting in over 70 different breeds of domestic cats.",
      "Cats have a keen sense of smell and can detect scents that are imperceptible to humans.",
      "Cats have a unique vocalization called a chirrup, which is a combination of a meow and a purr.",
      "Cats can have a lifespan of up to 20 years or more with proper care.",
      "Cats have a strong prey drive and will stalk and pounce on anything that moves.",
      "Cats have an excellent memory and can recall experiences and places from years ago.",
      "Cats have been used as working animals, including as pest control on ships and in factories.",
      "Cats are skilled climbers and can scale trees and vertical surfaces with ease.",
      "Cats have a specialized organ called the vomeronasal organ, which is used to detect pheromones and other chemical signals.",
      "Cats have a natural instinct to hide when they feel threatened or scared.",
      "Cats have a unique vocalization called a yowl, which is a loud, drawn-out sound that is often used to communicate with other cats.",
      "Cats have a natural curiosity and love to explore their environment.",
      "Cats have been revered and worshipped in many cultures throughout history, including ancient Egypt.",
      "Cats have a special type of hair called a tactile hair, which is more sensitive to touch than other hairs.",
      "Cats have a complex social hierarchy and can establish dominance over other cats.",
      "Cats have a natural instinct to cover their waste with dirt or litter.",
      "Cats have a unique sleeping pattern that involves short bursts of sleep throughout the day and night.",
      "Cats have a natural instinct to hunt and kill rodents, which has made them valued companions to humans for centuries.",
      "Cats have a specialized tongue that is covered in tiny hooks, which help them groom their fur and remove loose hair.",
      "Cats can make over 100 different vocal sounds, while dogs can only make about 10.",
      "Cats have a unique organ in their ear called the vestibular apparatus, which gives them their incredible sense of balance.",
      "Cats are obligate carnivores, which means they need to eat meat to survive.",
      "Cats are lactose intolerant and can't properly digest cow's milk.",
      "Cats have a specialized digestive system that allows them to consume bones and other rough materials without harm.",
      "Cats can make their bodies into a U-shape to fit into small spaces.",
      "Cats have a strong sense of smell, but prefer to rely on their vision when hunting.",
      "Cats have a flexible spine that allows them to twist and turn in mid-air.",
      "Cats have a unique paw-purr mechanism, which they use to communicate with other cats and to soothe themselves.",
      "Cats have a keen sense of hearing and can detect high-pitched sounds that are beyond the range of human hearing.",
      "Cats have a specialized muscle in their eyes that allows them to see in dim light.",
      "Cats can jump up to six times their body length in a single bound.",
      "Cats have a natural instinct to scratch, which helps them keep their claws sharp and remove dead outer layers.",
      "Cats have a natural instinct to hide when they are sick or injured.",
      "Cats have a unique type of purr that they use when they are in distress or in pain.",
      "Cats have a sensitive respiratory system and can be affected by secondhand smoke.",
      "Cats have a specialized gland in their mouth that they use to mark their territory with scent.",
      "Cats have a natural instinct to knead with their paws, which is a leftover behavior from when they were kittens nursing from their mother.",
      "Cats have a natural affinity for heights and will often seek out high places to rest and observe their surroundings.",
      "Cats have a strong sense of curiosity and will investigate anything new or interesting in their environment.",
      "Cats have a natural instinct to groom themselves, which helps them regulate their body temperature and remove parasites from their fur.",
      "Cats have a natural instinct to arch their backs and puff up their fur when they feel threatened or scared.",
      "Cats have a specialized way of walking called the pounce-and-creep, which is used when stalking prey.",
      "Cats have a unique set of whiskers on their face that they use to navigate their surroundings and determine the size and shape of objects.",
      "Cats have a natural instinct to hunt and play, which helps keep them mentally and physically stimulated.",
      "Cats have a complex body language that involves the position of their ears, tail, and body.",
      "Cats have a natural instinct to mark their territory with urine or scratch marks, which can be problematic for some cat owners.",
      "Cats have a natural instinct to hunt and kill, but will often bring their prey back to their owner as a gift.",
      "Cats have a unique meow that they use specifically to communicate with humans, rather than with other cats.",
      "Cats have a natural instinct to groom each other, which helps them bond and maintain social relationships within their group.",
      "Cats can purr at a frequency of 25 to 150 Hertz, which is known to promote healing and reduce stress.",
      "Cats can rotate their ears up to 180 degrees to locate the source of a sound.",
      "Cats have a third eyelid called the nictitating membrane, which helps protect their eyes and keep them moist.",
      "Cats have a unique way of drinking water, using their tongues to lap up water in a quick and efficient manner.",
      "Cats can jump up to seven times their body length in a single bound.",
      "Cats have a natural instinct to bury their waste, which is thought to be a way of avoiding predators in the wild.",
      "Cats have a keen sense of taste and can detect bitter flavors that are undetectable to humans.",
      "Cats have a special type of muscle in their paw pads that allows them to make a strong grip when climbing or holding onto prey.",
      "Cats have a natural instinct to arch their backs and fluff up their fur to appear larger and more intimidating.",
      "Cats have a natural instinct to hunt birds and other small animals, which can be problematic for wildlife populations.",
      "Cats have a unique way of communicating with other cats through scent marking and body language.",
      "Cats have a natural instinct to groom their owners, which is a sign of affection and trust.",
      "Cats have a unique vocalization called a chirp or trill, which is used to greet their owners or express excitement.",
      "Cats have a natural instinct to climb trees and other high places, which can sometimes lead to them getting stuck or injured.",
      "Cats have a natural instinct to knead their paws, which can be a sign of happiness or comfort.",
      "Cats have a natural instinct to hide their pain or discomfort, which can make it difficult for owners to detect health issues.",
      "Cats have a natural instinct to play and engage in interactive games, which helps keep them mentally stimulated and reduces behavior problems.",
      "Cats have a natural instinct to groom their fur after eating, which helps remove any traces of food and prevents odor.",
      "Cats have a natural instinct to cover their faces while sleeping, which is thought to be a way of protecting their eyes and nose from predators.",
      "Cats have a unique scent gland on their forehead, which they use to mark objects and people with their scent.",
      "Cats have a natural instinct to rub their faces against objects and people, which is a way of marking them with their scent.",
      "Cats have a natural instinct to follow their owners around the house, which is a sign of affection and attachment.",
      "Cats have a natural instinct to sharpen their claws, which can be a problem for furniture and other household items.",
      "Cats have a natural instinct to seek out warm and cozy places to sleep, which is why they often curl up in blankets or in sunbeams.",
      "Cats have a unique hunting technique called the 'death pounce', where they leap onto their prey with all four paws and deliver a fatal bite to the neck.",
      "Cats have a natural instinct to groom their paws, which helps keep them clean and free of debris.",
      "Cats have a natural instinct to blink slowly at their owners, which is a sign of trust and affection.",
      "Cats have a natural instinct to hide in small spaces, which can make them difficult to find when they want to be alone.",
    ]

    interaction.reply(facts[Math.floor(Math.random() * facts.length)])

  }
})