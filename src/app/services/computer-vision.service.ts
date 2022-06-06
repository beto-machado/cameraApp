import { Injectable } from '@angular/core';
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { CognitiveServicesCredentials } from '@azure/ms-rest-azure-js';

@Injectable({
  providedIn: 'root'
})
export class ComputerVisionService {

  private endPoint = 'https://ai-app-camera1.cognitiveservices.azure.com/';
  private key = 'e0b76b6a0b4947bca709d2eeb4ddb079';

  constructor() { }

  async detalhesImagem(imagem: Blob){
    const cognitiveServicesCredentials = new CognitiveServicesCredentials(this.key);
    const client = new ComputerVisionClient(cognitiveServicesCredentials, this.endPoint);

    return await client.describeImageInStream(imagem, { language: 'pt' }).then(result => {
      console.log('Análise:', result);
      const analise = {
        descricao: result.captions[0].text,
        confianca: result.captions[0].confidence,
        tags: result.tags.map(tag => tag),
      };

      return analise;
    });
  }

  async tagsImagem(imagem: Blob){
    const cognitiveServicesCredentials = new CognitiveServicesCredentials(this.key);
    const client = new ComputerVisionClient(cognitiveServicesCredentials, this.endPoint);

    return await client.analyzeImageInStream(imagem, { language: 'pt' }).then(result => {
      console.log('Tags:', result);
      return result.tags;
    });
  }
}
