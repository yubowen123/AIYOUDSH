import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{normalizeModelCatalog}=require('../aiyou/lib/canvas/providers/aiyouplus-provider-registry.cjs'),{buildGenericRequest}=require('../aiyou/lib/canvas/providers/aiyouplus-generic-provider.cjs');
const raw={id:'fixture-media',kind:'video',inputModalities:['text','image'],maxReferences:2,request:{method:'POST',path:'/generate',template:{model:'{{model}}',prompt:'{{prompt}}',reference_images:'{{referenceImages}}',aspect_ratio:'{{parameters.aspect_ratio}}',seed:'{{parameters.seed}}',output_audio:'{{parameters.output_audio}}'},optionalFields:['reference_images','aspect_ratio','seed','output_audio']},response:{urlsPath:'url'},parameterSchema:{model:{required:true,type:'string'},prompt:{required:true,type:'string'},seed:{type:'integer'},output_audio:{type:'boolean'}}};
const config=row=>({baseUrl:'http://127.0.0.1:5555',protocol:'http-json',authType:'none',modelCatalog:normalizeModelCatalog([row])});
test('declared optional root fields omit absent values; required variables still fail before transport',()=>{
 const cfg=config(raw),result=buildGenericRequest(cfg,{kind:'video',model:raw.id,prompt:'cube'});assert.deepEqual(result.body,{model:raw.id,prompt:'cube'});
 assert.throws(()=>buildGenericRequest(cfg,{kind:'video',model:raw.id}),/缺少参数/);
});
test('explicit parameter aliases render API spelling and retain false and zero',()=>{
 const result=buildGenericRequest(config(raw),{kind:'video',model:raw.id,prompt:'cube',aspectRatio:'16:9',seed:0,parameters:{output_audio:false}},{imageUrls:['https://fixture.test/a.png']});
 assert.deepEqual(result.body,{model:raw.id,prompt:'cube',reference_images:['https://fixture.test/a.png'],aspect_ratio:'16:9',seed:0,output_audio:false});
 assert.throws(()=>buildGenericRequest(config(raw),{kind:'video',model:raw.id,prompt:'cube',parameters:{unknown:'x'}}),/未映射参数/);
});
test('optional metadata cannot weaken required schema, constants, nested fields or unknown keys',()=>{
 for(const changed of [{optionalFields:['model']},{optionalFields:['missing']},{optionalFields:['reference_images.0']},{template:{...raw.request.template,seed:123},optionalFields:['seed']}])assert.throws(()=>config({...raw,request:{...raw.request,...changed}}),/可选字段/);
 const row={...raw,request:{...raw.request,template:{...raw.request.template,seed:'{{parameters.seed}}'}},parameterSchema:{...raw.parameterSchema,seed:{required:true,type:'integer'}}};assert.throws(()=>config(row),/可选字段/);
});
