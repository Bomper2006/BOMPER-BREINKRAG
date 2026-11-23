// Oorspronklike BOMPER BREINKRAG mini-lesse en vasvrae — behou uit die vorige webwerf.
window.BOMPER_DATA = (() => {
  const lessons = [
    {id:1,grade:8,title:'Eenvoudige vergelykings',topic:'Algebra',mark:'x',desc:'Los onbekende waardes stap vir stap op.',formula:'3x + 5 = 20',example:'3x + 5 = 20\n3x = 20 − 5\n3x = 15\nx = 5'},
    {id:2,grade:8,title:'Wette van eksponente',topic:'Getalle',mark:'xⁿ',desc:'Leer hoe magte werk wanneer ons vermenigvuldig.',formula:'aᵐ × aⁿ = aᵐ⁺ⁿ',example:'2³ × 2² = 2³⁺²\n= 2⁵\n= 32'},
    {id:3,grade:9,title:'Faktorisering',topic:'Algebra',mark:'(x)',desc:'Breek ’n uitdrukking op in eenvoudiger faktore.',formula:'x² + 5x + 6 = (x + 2)(x + 3)',example:'Soek twee getalle met:\nSom = 5 en produk = 6\n2 + 3 = 5; 2 × 3 = 6\nDus: (x + 2)(x + 3)'},
    {id:4,grade:9,title:'Reguitlyngrafieke',topic:'Funksies',mark:'↗',desc:'Verstaan gradiënt en waar ’n lyn die y-as sny.',formula:'y = mx + c',example:'Vir y = 2x + 1:\nGradiënt m = 2\ny-afsnit c = 1\nDie lyn sny die y-as by (0; 1).'},
    {id:5,grade:10,title:'Kwadratiese vergelykings',topic:'Algebra',mark:'x²',desc:'Vind oplossings deur te faktoriseer.',formula:'x² − 5x + 6 = 0',example:'x² − 5x + 6 = 0\n(x − 2)(x − 3) = 0\nDus x = 2 of x = 3'},
    {id:6,grade:10,title:'Trigonometriese verhoudings',topic:'Trigonometrie',mark:'sin',desc:'Gebruik sinus, cosinus en tangens in reghoekige driehoeke.',formula:'sin θ = teenoorstaande / skuinssy',example:'As die teenoorstaande sy = 3\nen die skuinssy = 5:\nsin θ = 3/5 = 0,6'},
    {id:7,grade:11,title:'Rekenkundige rye',topic:'Rye',mark:'aₙ',desc:'Bereken enige term van ’n rekenkundige ry.',formula:'Tₙ = a + (n − 1)d',example:'Ry: 4; 7; 10; 13; ...\na = 4; d = 3\nT₁₂ = 4 + (12 − 1)3\n= 37'},
    {id:8,grade:11,title:'Inverse funksies',topic:'Funksies',mark:'f⁻¹',desc:'Draai die inset en uitset van ’n funksie om.',formula:'As f(x) = 2x + 3, dan f⁻¹(x) = (x − 3)/2',example:'Skryf y = 2x + 3\nRuil x en y om: x = 2y + 3\n2y = x − 3\ny = (x − 3)/2'},
    {id:9,grade:12,title:'Differensiasie',topic:'Calculus',mark:'dy/dx',desc:'Vind die afgeleide van ’n polinoomfunksie.',formula:'d(xⁿ)/dx = nxⁿ⁻¹',example:'f(x) = 3x³ − 2x\nf′(x) = 3(3x²) − 2\n= 9x² − 2'},
    {id:10,grade:12,title:'Waarskynlikheid',topic:'Statistiek',mark:'P(A)',desc:'Bereken die kans dat een van twee gebeurtenisse plaasvind.',formula:'P(A ∪ B) = P(A) + P(B) − P(A ∩ B)',example:'P(A) = 0,4; P(B) = 0,3\nP(A ∩ B) = 0,1\nP(A ∪ B) = 0,4 + 0,3 − 0,1\n= 0,6'}
  ];
  const questions = [
    {grade:8,q:'Los op: 3x + 5 = 20. Wat is x?',choices:['3','5','7','15'],correct:1,why:'3x = 15, dus x = 5.'},
    {grade:8,q:'Wat is 2³ × 2²?',choices:['10','16','32','64'],correct:2,why:'Tel die eksponente: 2⁵ = 32.'},
    {grade:9,q:'Watter faktore vorm x² + 5x + 6?',choices:['(x + 1)(x + 6)','(x + 2)(x + 3)','(x − 2)(x − 3)','(x + 5)(x + 6)'],correct:1,why:'2 + 3 = 5 en 2 × 3 = 6.'},
    {grade:9,q:'Wat is die gradiënt van y = 2x + 1?',choices:['1','−2','2','0'],correct:2,why:'Die koëffisiënt van x is die gradiënt: m = 2.'},
    {grade:10,q:'Wat is die oplossings van x² − 5x + 6 = 0?',choices:['−2 en −3','1 en 6','2 en 3','−1 en −6'],correct:2,why:'(x − 2)(x − 3) = 0 gee 2 en 3.'},
    {grade:10,q:'Watter verhouding is sin θ?',choices:['Aanliggende / skuinssy','Teenoorstaande / skuinssy','Teenoorstaande / aanliggende','Skuinssy / teenoorstaande'],correct:1,why:'Sinus is teenoorstaande gedeel deur skuinssy.'},
    {grade:11,q:'In die ry 4; 7; 10; ... wat is T₁₂?',choices:['33','37','40','44'],correct:1,why:'T₁₂ = 4 + 11(3) = 37.'},
    {grade:11,q:'Wat is die inverse van f(x) = 2x + 3?',choices:['2x − 3','(x + 3)/2','(x − 3)/2','3x + 2'],correct:2,why:'Ruil x en y om en los vir y op.'},
    {grade:12,q:'Wat is die afgeleide van 3x³ − 2x?',choices:['9x² − 2','3x² − 2','9x³ − 2','x² − 2'],correct:0,why:'Gebruik die magsreël term vir term.'},
    {grade:12,q:'As P(A)=0,4, P(B)=0,3 en P(A∩B)=0,1, wat is P(A∪B)?',choices:['0,8','0,1','0,5','0,6'],correct:3,why:'0,4 + 0,3 − 0,1 = 0,6.'}
  ];
  return { lessons, questions };
})();
