from flask import Flask, jsonify, request
from flask_cors import CORS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import google.generativeai as genai
import random as random
import json
app = Flask(__name__)
CORS(app)

# Configure API
genai.configure(api_key="AIzaSyDnZmFFWoSBgQ2ha-4uRPPTzm3-B37k8oo")
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.9,api_key="AIzaSyDnZmFFWoSBgQ2ha-4uRPPTzm3-B37k8oo")

template = """Generate exactly 5 {level} level words related to {topic} in Arabic.
For each word provide:
1. The word in Arabic
2. Its pronunciation in English
3. Its meaning in English
4. A description/usage example in Arabic that does NOT contain the word itself but clearly describes its concept
Format each line as: word | pronunciation | english_meaning | arabic_description"""

prompt = PromptTemplate(template=template, input_variables=["level", "topic"])
chain = LLMChain(llm=llm, prompt=prompt)

grammar_template = """Generate 5 {level} level Arabic grammar exercises focusing on common mistakes.
Each exercise MUST follow this exact structure:

For each exercise provide EXACTLY:
1. An incorrect Arabic sentence showing a common grammatical mistake
2. The correct version of the same sentence
3. A clear explanation of the grammar rule in English
4. An explanation of why the mistake is common
5. A practical example showing correct usage

Format each line EXACTLY as: incorrect | correct | rule | mistake | usage

Example:
انا يكتب الدرس | انا اكتب الدرس | Present tense verbs must match the subject's person | Forgetting to conjugate the verb properly | انا اكتب الدرس كل يوم"""

grammar_prompt = PromptTemplate(template=grammar_template, input_variables=["level"])
grammar_chain = LLMChain(llm=llm, prompt=grammar_prompt)

word_game_template = """Generate exactly 5 {level} Arabic words.
For each word provide:
1. The word in Arabic
2. Its pronunciation in English
3. A descriptive hint in English (without using the word itself)
4. Its meaning in English
5. A description/usage example in Arabic
6. Common phrases using this word
Format each line as: word | pronunciation | hint | meaning | example | phrases"""

word_game_prompt = PromptTemplate(template=word_game_template, input_variables=["level"])
word_game_chain = LLMChain(llm=llm, prompt=word_game_prompt)

word_explorer_template = """For the Arabic word '{word}', create a detailed analysis by filling in this EXACT JSON structure:
{{
  "root": {{
    "letters": "Write the root letters in Arabic",
    "meaning": "Write the basic meaning of the root"
  }},
  "derivatives": [
    {{
      "word": "Write a derivative word in Arabic",
      "pronunciation": "Write its pronunciation",
      "meaning": "Write its meaning"
    }}
  ],
  "usage": [
    {{
      "arabic": "Write an example sentence in Arabic",
      "pronunciation": "Write its pronunciation",
      "english": "Write its English translation"
    }}
  ],
  "dialects": {{
    "egyptian": "Write how it's used in Egyptian dialect",
    "algerian": "Write how it's used in Algerian dialect",
    "gulf": "Write how it's used in Gulf dialect"
  }},
  "related_words": [
    {{
      "word": "Write a related word in Arabic",
      "pronunciation": "Write its pronunciation",
      "meaning": "Write its meaning"
    }}
  ],
  "common_phrases": [
    {{
      "phrase": "Write a common phrase using the word",
      "pronunciation": "Write its pronunciation",
      "meaning": "Write its meaning"
    }}
  ]
}}

IMPORTANT:
1. Maintain the exact JSON structure
2. Replace all placeholder text with appropriate content for the word '{word}'
3. Include at least 2 items in each array
4. Keep all field names exactly as shown
5. Ensure proper JSON formatting with double quotes
6. Do not add any additional fields
7. Do not include markdown formatting or code blocks

For example, for the word "قلم" (pen), start with:
{{
  "root": {{
    "letters": "ق ل م",
    "meaning": "to cut, trim, shape"
  }},
  ... continue with rest of structure
}}"""

word_explorer_prompt = PromptTemplate(template=word_explorer_template, input_variables=["word"])
word_explorer_chain = LLMChain(llm=llm, prompt=word_explorer_prompt)

sentence_analyzer_template = """Analyze this Arabic sentence and provide a detailed analysis in Markdown format:

=== Grammar Analysis ===

- **Original:** {sentence}

- **Analysis:**
  * Break down each phrase
  * For each word provide:
    - Arabic word with diacritics
    - Romanized pronunciation in parentheses
    - Part of speech
    - Grammatical function
    - Case marking explanation
    - Any additional relevant details

- **Errors:**
  * List any grammatical errors
  * Explain why they are errors
  * Note any stylistic concerns

- **Correction:**
  * Provide corrected version if needed
  * Explain changes if any

- **Rules:**
  * List relevant grammar rules
  * Explain how they apply
  * Note any exceptions

- **Alternatives:**
  * Provide alternative phrasings
  * Include both Arabic text and transliteration
  * Explain nuances in meaning

Format the response exactly as shown in the example, with proper Markdown formatting and detailed explanations."""

sentence_analyzer_prompt = PromptTemplate(template=sentence_analyzer_template, input_variables=["sentence"])
sentence_analyzer_chain = LLMChain(llm=llm, prompt=sentence_analyzer_prompt)

sentence_template = """Generate 3 Arabic sentences for level {level} about topic {topic}.
For each sentence provide:
1. Original sentence in Arabic
2. Detailed grammatical analysis:
   - Word-by-word breakdown
   - Part of speech for each word
   - Case markings explanation
3. Full translation
4. Grammar rules used
5. Alternative formulations
6. Cultural context or usage notes

Format each section clearly with headers and bullet points."""

sentence_prompt = PromptTemplate(template=sentence_template, input_variables=["level", "topic"])
sentence_chain = LLMChain(llm=llm, prompt=sentence_prompt)

translation_template = """Analyze and translate this {source_lang} sentence to {target_lang}:
{sentence}

Provide:
1. Word-by-word translation:
   - Original word
   - Part of speech
   - Literal meaning
   - Function in sentence
   
2. Structural Analysis:
   - Word order differences
   - Grammar structure changes
   - Tense/aspect modifications
   
3. Full Translation:
   - Literal translation
   - Natural translation
   - Alternative translations
   
4. Cultural Notes:
   - Usage context
   - Cultural implications
   - Common mistakes
   
5. Grammar Rules:
   - Source language rules
   - Target language rules
   - Key differences

Format with clear headers and detailed explanations."""

translation_prompt = PromptTemplate(
    template=translation_template, 
    input_variables=["source_lang", "target_lang", "sentence"]
)
translation_chain = LLMChain(llm=llm, prompt=translation_prompt)

@app.route('/api/generate-quiz', methods=['POST'])
def generate_quiz():
    data = request.json
    level = data.get('level', 'مبتدئ')
    topic = data.get('topic', 'رياضيات')
    
    try:
        response = chain.run({"level": level, "topic": topic})
        words_and_data = [line for line in response.strip().split('\n') if '|' in line]
        
        # Process and shuffle the data
        quiz_data = []
        for line in words_and_data:
            word, pron, meaning, desc = map(str.strip, line.split('|'))
            quiz_data.append({
                'word': word,
                'pronunciation': pron,
                'meaning': meaning,
                'description': desc
            })
        
        # Shuffle descriptions while keeping track of correct matches
        import random
        original_order = list(range(len(quiz_data)))
        shuffled_order = list(range(len(quiz_data)))
        random.shuffle(shuffled_order)
        
        shuffled_data = []
        for i in range(len(quiz_data)):
            item = quiz_data[i].copy()
            item['originalIndex'] = original_order[i]
            item['shuffledIndex'] = shuffled_order[i]
            shuffled_data.append(item)
            
        return jsonify({
            'status': 'success',
            'data': shuffled_data
        })
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/generate-grammar', methods=['POST'])
def generate_grammar():
    data = request.json
    level = data.get('level', 'مبتدئ')
    max_retries = 3
    
    for attempt in range(max_retries):
        try:
            response = grammar_chain.run({"level": level})
            exercises = [line for line in response.strip().split('\n') if '|' in line]
            
            if len(exercises) != 5:
                print(f"Retry {attempt + 1}: Invalid number of exercises ({len(exercises)})")
                continue

            # Validate exercise format
            valid_exercises = []
            for exercise in exercises:
                parts = exercise.split('|')
                if len(parts) != 5:
                    continue
                    
                incorrect, correct, rule, mistake, usage = map(str.strip, parts)
                if all([incorrect, correct, rule, mistake, usage]):
                    valid_exercises.append({
                        'incorrect': incorrect,
                        'correct': correct,
                        'rule': rule,
                        'mistake': mistake,
                        'usage': usage
                    })

            if len(valid_exercises) >= 3:  # Accept if we have at least 3 valid exercises
                # Process exercises into final format
                grammar_data = []
                for i, exercise in enumerate(valid_exercises[:5]):
                    options = [exercise['incorrect'], exercise['correct']]
                    random.shuffle(options)
                    
                    grammar_data.append({
                        'id': i,
                        'options': options,
                        'correctIndex': options.index(exercise['correct']),
                        'rule': exercise['rule'],
                        'mistake': exercise['mistake'],
                        'usage': exercise['usage']
                    })
                    
                return jsonify({
                    'status': 'success',
                    'data': grammar_data
                })
            
            print(f"Retry {attempt + 1}: Not enough valid exercises")
            
        except Exception as e:
            print(f"Retry {attempt + 1}: {str(e)}")
            continue
    
    return jsonify({
        'status': 'error',
        'message': 'Failed to generate valid exercises after multiple attempts'
    }), 500

@app.route('/api/word-game', methods=['POST'])
def generate_word_game():
    data = request.json
    level = data.get('level', 'مبتدئ')
    
    try:
        response = word_game_chain.run({"level": level})
        words = [line for line in response.strip().split('\n') if '|' in line]
        
        if len(words) < 5:
            raise ValueError("Not enough words generated")

        word_data = []
        for word in words[:5]:
            parts = word.split('|')
            if len(parts) == 6:
                arabic, pronunciation, hint, meaning, example, phrases = map(str.strip, parts)
                word_data.append({
                    'word': arabic,
                    'pronunciation': pronunciation,
                    'hint': hint,
                    'meaning': meaning,
                    'example': example,
                    'phrases': phrases.split(';') if ';' in phrases else [phrases]
                })
        
        selected_word = random.choice(word_data)
        
        return jsonify({
            'status': 'success',
            'data': selected_word
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/explore-word', methods=['POST'])
def explore_word():
    data = request.json
    word = data.get('word', '').strip()
    
    if not word:
        return jsonify({
            'status': 'error',
            'message': 'No word provided'
        }), 400
    
    try:
        # Generate response
        response = word_explorer_chain.run({"word": word})
        
        # Clean the response
        response = response.replace('```json', '').replace('```', '').strip()
        
        try:
            # Parse JSON
            word_data = json.loads(response)
            
            # Validate structure
            required_fields = ['root', 'derivatives', 'usage', 'dialects', 'related_words', 'common_phrases']
            required_subfields = {
                'root': ['letters', 'meaning'],
                'dialects': ['egyptian', 'algerian', 'gulf']  # Changed 'levantine' to 'algerian'
            }
            array_fields = ['derivatives', 'usage', 'related_words', 'common_phrases']
            
            # Validate structure
            for field in required_fields:
                if field not in word_data:
                    raise ValueError(f"Missing field: {field}")
                
                if field in required_subfields:
                    for subfield in required_subfields[field]:
                        if subfield not in word_data[field]:
                            raise ValueError(f"Missing subfield in {field}: {subfield}")
                
                if field in array_fields:
                    if not isinstance(word_data[field], list):
                        raise ValueError(f"Field {field} must be an array")
                    if len(word_data[field]) < 1:
                        raise ValueError(f"Field {field} must have at least one item")
            
            return jsonify({
                'status': 'success',
                'data': word_data
            })
            
        except json.JSONDecodeError as e:
            print(f"JSON parsing error for word '{word}': {str(e)}")
            print(f"Raw response:\n{response}")
            raise ValueError("Invalid JSON format in response")
            
        except ValueError as e:
            print(f"Validation error for word '{word}': {str(e)}")
            print(f"Parsed data:\n{json.dumps(word_data, indent=2, ensure_ascii=False)}")
            raise
            
    except Exception as e:
        print(f"Error analyzing word '{word}': {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to analyze word. Please try a different word or try again later.'
        }), 500

@app.route('/api/analyze-sentence', methods=['POST'])
def analyze_sentence():
    data = request.json
    sentence = data.get('sentence', '').strip()
    
    if not sentence:
        return jsonify({
            'status': 'error',
            'message': 'No sentence provided'
        }), 400
    
    try:
        # Generate response
        response = sentence_analyzer_chain.run({"sentence": sentence})
        
        # The response is already formatted in Markdown, no need for JSON parsing
        return jsonify({
            'status': 'success',
            'data': {
                'analysis': response  # Return the formatted Markdown directly
            }
        })
            
    except Exception as e:
        print(f"Error analyzing sentence: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to analyze sentence. Please try again.'
        }), 500

@app.route('/api/generate-sentences', methods=['POST'])
def generate_sentences():
    data = request.json
    level = data.get('level', 'ابتدائي')
    topic = data.get('topic', 'ثقافة')
    
    try:
        response = sentence_chain.run({"level": level, "topic": topic})
        return jsonify({
            'status': 'success',
            'analysis': response
        })
    except Exception as e:
        print(f"Error generating sentences: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to generate sentences'
        }), 500

@app.route('/api/translate', methods=['POST'])
def translate():
    data = request.json
    direction = data.get('direction', '1')
    sentence = data.get('sentence', '').strip()
    
    if not sentence:
        return jsonify({
            'status': 'error',
            'message': 'No sentence provided'
        }), 400
    
    try:
        source_lang = "English" if direction == "1" else "Arabic"
        target_lang = "Arabic" if direction == "1" else "English"
        
        response = translation_chain.run({
            "source_lang": source_lang,
            "target_lang": target_lang,
            "sentence": sentence
        })
        
        return jsonify({
            'status': 'success',
            'analysis': response
        })
            
    except Exception as e:
        print(f"Error analyzing translation: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to analyze translation. Please try again.'
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
