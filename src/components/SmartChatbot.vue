<template>
  <div class="chatbot-container">
    <div class="chatbot-header">
      <h3>Style Assistant</h3>
      <button @click="toggleChat" class="toggle-btn">
        {{ isOpen ? '×' : '💬' }}
      </button>
    </div>
    
    <div v-if="isOpen" class="chatbot-body">
      <div ref="messagesContainer" class="chat-messages">
        <div v-for="(message, index) in messages" :key="index" :class="['message', message.type]">
          <div class="message-content">{{ message.content }}</div>
          <div v-if="message.outfits" class="outfit-suggestions">
            <div v-for="(outfit, i) in message.outfits" :key="i" class="outfit">
              <h4>{{ outfit.name }}</h4>
              <div class="color-palette">
                <div v-for="(color, j) in outfit.colors" :key="j" 
                     :style="{ backgroundColor: color }" 
                     class="color-box"
                     :title="color">
                </div>
              </div>
              <p>{{ outfit.description }}</p>
              <div v-if="outfit.items" class="outfit-items">
                <div v-for="(item, k) in outfit.items" :key="k" class="item">
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="user-input">
        <input 
          v-model="userMessage" 
          @keyup.enter="sendMessage" 
          placeholder="Demandez une tenue (ex: tenue élégante pour soirée été)"
          class="message-input"
        />
        <button @click="sendMessage" class="send-btn">Envoyer</button>
      </div>
      
      <div class="quick-actions">
        <button @click="quickPrompt('Tenue décontractée pour le weekend')" class="quick-btn">Weekend</button>
        <button @click="quickPrompt('Tenue professionnelle pour bureau')" class="quick-btn">Bureau</button>
        <button @click="quickPrompt('Tenue élégante pour soirée')" class="quick-btn">Soirée</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue';

interface OutfitSuggestion {
  name: string;
  colors: string[];
  description: string;
  items?: string[];
}

interface ChatMessage {
  type: 'user' | 'bot';
  content: string;
  outfits?: OutfitSuggestion[];
}

export default defineComponent({
  name: 'SmartChatbot',
  setup() {
    const isOpen = ref(false);
    const userMessage = ref('');
    const messages = ref<ChatMessage[]>([]);
    const messagesContainer = ref<HTMLElement | null>(null);

    const toggleChat = () => {
      isOpen.value = !isOpen.value;
      if (isOpen.value) {
        nextTick(() => scrollToBottom());
      }
    };

    const scrollToBottom = () => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
      }
    };

    const quickPrompt = (prompt: string) => {
      userMessage.value = prompt;
      sendMessage();
    };

    const sendMessage = () => {
      if (!userMessage.value.trim()) return;

      // Add user message
      messages.value.push({
        type: 'user',
        content: userMessage.value
      });

      const userInput = userMessage.value.toLowerCase();
      userMessage.value = '';

      nextTick(() => {
        scrollToBottom();
        setTimeout(() => generateResponse(userInput), 500);
      });
    };

    const generateResponse = (userInput: string) => {
      let response: ChatMessage = {
        type: 'bot',
        content: '',
        outfits: []
      };

      // Analyse de la demande de l'utilisateur
      const isCasual = userInput.includes('décontracté') || userInput.includes('weekend') || userInput.includes('quotidien');
      const isFormal = userInput.includes('professionnel') || userInput.includes('bureau') || userInput.includes('travail');
      const isEvening = userInput.includes('soirée') || userInput.includes('élégant') || userInput.includes('festif');
      const isSummer = userInput.includes('été') || userInput.includes('chaud');
      const isWinter = userInput.includes('hiver') || userInput.includes('froid');

      // Génération des suggestions
      if (isCasual) {
        response.content = "Voici quelques idées de tenues décontractées :";
        response.outfits = generateCasualOutfits(isSummer, isWinter);
      } else if (isFormal) {
        response.content = "Quelques suggestions pour une tenue professionnelle :";
        response.outfits = generateFormalOutfits(isSummer, isWinter);
      } else if (isEvening) {
        response.content = "Des idées pour une soirée élégante :";
        response.outfits = generateEveningOutfits(isSummer, isWinter);
      } else {
        response.content = "Je peux vous proposer des combinaisons de tenues. Pour des suggestions plus précises, précisez le style (décontracté, professionnel, élégant) et la saison.";
        response.outfits = generateRandomOutfits();
      }

      messages.value.push(response);
      nextTick(() => scrollToBottom());
    };

    // Fonctions de génération d'outfits
    const generateCasualOutfits = (summer: boolean, winter: boolean): OutfitSuggestion[] => {
      if (summer) {
        return [
          {
            name: "Look décontracté été",
            colors: ['#4CAF50', '#FFFFFF', '#FFC107'],
            description: "Tenue légère et confortable pour les journées chaudes",
            items: ["T-shirt blanc", "Short vert menthe", "Sandales", "Lunettes de soleil"]
          },
          {
            name: "Style urbain été",
            colors: ['#2196F3', '#000000', '#9E9E9E'],
            description: "Look cool pour la ville",
            items: ["T-shirt bleu", "Jeans noir", "Baskets", "Casquette"]
          }
        ];
      } else if (winter) {
        return [
          {
            name: "Confort hiver",
            colors: ['#795548', '#FFFFFF', '#607D8B'],
            description: "Tenue chaude et confortable",
            items: ["Pull marron", "Jeans bleu", "Doudoune", "Bottes"]
          }
        ];
      } else {
        return [
          {
            name: "Look décontracté",
            colors: ['#3F51B5', '#FFFFFF', '#000000'],
            description: "Tenue simple et stylée",
            items: ["T-shirt bleu roi", "Jeans", "Baskets"]
          }
        ];
      }
    };

    const generateFormalOutfits = (summer: boolean, winter: boolean): OutfitSuggestion[] => {
      // Implémentation similaire pour les tenues formelles
      return [
        {
          name: "Classique bureau",
          colors: ['#000000', '#FFFFFF', '#808080'],
          description: "Tenue professionnelle intemporelle",
          items: ["Costume noir", "Chemise blanche", "Cravate", "Chaussures de ville"]
        },
        {
          name: "Style business casual",
          colors: ['#3E2723', '#D7CCC8', '#5D4037'],
          description: "Élégant mais moins formel",
          items: ["Veste beige", "Pantalon marron", "Chemise bleu clair"]
        }
      ];
    };

    const generateEveningOutfits = (summer: boolean, winter: boolean): OutfitSuggestion[] => {
      // Implémentation similaire pour les tenues de soirée
      return [
        {
          name: "Élégance nocturne",
          colors: ['#000000', '#E91E63', '#FFFFFF'],
          description: "Look sophistiqué pour une soirée",
          items: ["Robe noire", "Talons", "Bijoux dorés"]
        },
        {
          name: "Soirée d'été",
          colors: ['#9C27B0', '#FFEB3B', '#FFFFFF'],
          description: "Tenue légère et festive",
          items: ["Robe violette", "Sandales", "Accessoires jaunes"]
        }
      ];
    };

    const generateRandomOutfits = (): OutfitSuggestion[] => {
      return [
        {
          name: "Combinaison printanière",
          colors: ['#FF9800', '#8BC34A', '#00BCD4'],
          description: "Des couleurs vives pour la saison"
        },
        {
          name: "Harmonie neutre",
          colors: ['#795548', '#9E9E9E', '#FFFFFF'],
          description: "Des tons neutres qui s'assemblent parfaitement"
        }
      ];
    };

    // Message de bienvenue initial
    onMounted(() => {
      setTimeout(() => {
        messages.value.push({
          type: 'bot',
          content: "Bonjour ! Je suis votre assistant style. Je peux vous suggérer des combinaisons de tenues selon l'occasion, la saison ou vos préférences de couleurs. Comment puis-je vous aider aujourd'hui ?",
          outfits: []
        });
      }, 1000);
    });

    return {
      isOpen,
      userMessage,
      messages,
      messagesContainer,
      toggleChat,
      sendMessage,
      quickPrompt
    };
  }
});
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  font-family: 'Arial', sans-serif;
  z-index: 1000;
  border: 1px solid white;
}


.chatbot-header {
  background-color: #4a919e;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chatbot-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 10px;
}

.chatbot-body {
  display: flex;
  flex-direction: column;
  height: 400px;
}

.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background-color: #f5f5f5;
}

.message {
  margin-bottom: 15px;
  max-width: 80%;
}

.message-content {
  padding: 10px 15px;
  border-radius: 18px;
  word-wrap: break-word;
}

.user {
  margin-left: auto;
}

.user .message-content {
  background-color: #6200ea;
  color: white;
  border-bottom-right-radius: 5px;
}

.bot {
  margin-right: auto;
}

.bot .message-content {
  background-color: #e0e0e0;
  color: #333;
  border-bottom-left-radius: 5px;
}

.outfit-suggestions {
  margin-top: 10px;
}

.outfit {
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.outfit h4 {
  margin: 0 0 8px 0;
  color: #6200ea;
}

.color-palette {
  display: flex;
  margin: 10px 0;
}

.color-box {
  width: 30px;
  height: 30px;
  margin-right: 5px;
  border-radius: 50%;
  border: 1px solid #ddd;
}

.outfit-items {
  margin-top: 10px;
  font-size: 0.9rem;
}

.item {
  padding: 5px;
  border-bottom: 1px dashed #eee;
}

.user-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #eee;
  background-color: white;
}

.message-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
}

.send-btn {
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0 15px;
  margin-left: 10px;
  cursor: pointer;
}

.quick-actions {
  display: flex;
  padding: 10px;
  background-color: white;
  border-top: 1px solid #eee;
  justify-content: space-between;
}

.quick-btn {
  background-color: #f5f5f5;
  border: none;
  border-radius: 15px;
  padding: 5px 10px;
  font-size: 0.8rem;
  cursor: pointer;
  color: #6200ea;
}

.quick-btn:hover {
  background-color: #e0e0e0;
}
</style>