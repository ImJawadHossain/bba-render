import React from 'react';
import {Composition, Folder, Still} from 'remotion';
import {Rhythm0} from './Video';
import {Rhythm0Thumbnail} from './Thumbnail';
import {FPS, HEIGHT, WIDTH, makeCalculateMetadata} from './common/meta';
import {fallbackTiming} from './script';
import {MilgramThumbnail, MilgramVideo, milgramFallback} from './milgram/Video';
import {AschThumbnail, AschVideo, aschFallback} from './asch/Video';
import {BlockbusterThumbnail, BlockbusterVideo, blockbusterFallback} from './blockbuster/Video';
import {NewCokeThumbnail, NewCokeVideo, newCokeFallback} from './newcoke/Video';
import {McDonaldsThumbnail, McDonaldsVideo, mcdonaldsFallback} from './mcdonalds/Video';
import {KodakThumbnail, KodakVideo, kodakFallback} from './kodak/Video';
import {PepsiNavyThumbnail, PepsiNavyVideo, pepsiNavyFallback} from './pepsinavy/Video';
import {HarrierThumbnail, HarrierVideo, harrierFallback} from './harrier/Video';
import {BulbThumbnail, BulbVideo, bulbFallback} from './bulb/Video';
import {DeBeersThumbnail, DeBeersVideo, deBeersFallback} from './debeers/Video';
import {FantaThumbnail, FantaVideo, fantaFallback} from './fanta/Video';
import {CocaThumbnail, CocaVideo, cocaFallback} from './cocacola/Video';
import {LamboThumbnail, LamboVideo, lamboFallback} from './lambo/Video';
import {AdidasThumbnail, AdidasVideo, adidasFallback} from './adidas/Video';
import {YahooThumbnail, YahooVideo, yahooFallback} from './yahoo/Video';
import {NikeThumbnail, NikeVideo, nikeFallback} from './nike/Video';
import {VwThumbnail, VwVideo, vwFallback} from './vw/Video';
import {TheranosThumbnail, TheranosVideo, theranosFallback} from './theranos/Video';
import {PintoThumbnail, PintoVideo, pintoFallback} from './pinto/Video';
import {XeroxThumbnail, XeroxVideo, xeroxFallback} from './xerox/Video';
import {AppleMsThumbnail, AppleMsVideo, appleMsFallback} from './applems/Video';
import {NokiaThumbnail, NokiaVideo, nokiaFallback} from './nokia/Video';
import {SpotlightThumbnail, SpotlightVideo, spotlightFallback} from './spotlight/Video';
import {DunningThumbnail, DunningVideo, dunningFallback} from './dunning/Video';
import {HelplessThumbnail, HelplessVideo, helplessFallback} from './helpless/Video';
import {MirroringThumbnail, MirroringVideo, mirroringFallback} from './mirroring/Video';
import {FranklinThumbnail, FranklinVideo, franklinFallback} from './franklin/Video';
import {BecauseThumbnail, BecauseVideo, becauseFallback} from './because/Video';
import {FootThumbnail, FootVideo, footFallback} from './foot/Video';
import {DecoyThumbnail, DecoyVideo, decoyFallback} from './decoy/Video';
import {PratfallThumbnail, PratfallVideo, pratfallFallback} from './pratfall/Video';
import {PigeonThumbnail, PigeonVideo, pigeonFallback} from './pigeon/Video';
import {StillfaceThumbnail, StillfaceVideo, stillfaceFallback} from './stillface/Video';
import {WaveThumbnail, WaveVideo, waveFallback} from './wave/Video';
import {BystanderThumbnail, BystanderVideo, bystanderFallback} from './bystander/Video';
import {PygmalionThumbnail, PygmalionVideo, pygmalionFallback} from './pygmalion/Video';
import {RatparkThumbnail, RatparkVideo, ratparkFallback} from './ratpark/Video';
import {BiryaniThumbnail, BiryaniVideo, biryaniFallback} from './biryani/Video';
import {LandlordThumbnail, LandlordVideo, landlordFallback} from './landlord/Video';
import {SareeThumbnail, SareeVideo, sareeFallback} from './saree/Video';
import {SalaryThumbnail, SalaryVideo, salaryFallback} from './salary/Video';
import {LoanThumbnail, LoanVideo, loanFallback} from './loan/Video';
import {SilenceThumbnail, SilenceVideo, silenceFallback} from './silence/Video';
import {FriendThumbnail, FriendVideo, friendFallback} from './friend/Video';
import {ShopkeeperThumbnail, ShopkeeperVideo, shopkeeperFallback} from './shopkeeper/Video';
import {TorchesThumbnail, TorchesVideo, torchesFallback} from './torches/Video';
import {agent} from './agent/Video';
import {bakery} from './bakery/Video';
import {milk} from './milk/Video';
import {trialtv} from './trialtv/Video';
import {delivery} from './delivery/Video';
import {solar} from './solar/Video';
import {village} from './village/Video';
import {apron} from './apron/Video';
import {fblive} from './fblive/Video';
import {bike} from './bike/Video';
import {onestep} from './onestep/Video';
import {mess} from './mess/Video';
import {comment} from './comment/Video';
import {gym} from './gym/Video';
import {options} from './options/Video';
import {dumb} from './dumb/Video';
import {onlyhe} from './onlyhe/Video';
import {begging} from './begging/Video';
import {worsttea} from './worsttea/Video';
import {told} from './told/Video';
import {scam} from './scam/Video';
import {brownmm} from './brownmm/Video';
import {hanoirats} from './hanoirats/Video';
import {stink} from './stink/Video';
import {auction} from './auction/Video';
import {law01} from './law01/Video';
import {law02} from './law02/Video';
import {law03} from './law03/Video';
import {law04} from './law04/Video';
import {law05} from './law05/Video';
import {pori} from './pori/Video';
import {porivax} from './porivax/Video';
import {parsha} from './parsha/Video';
import {parsha2} from './parsha2/Video';
import {parsha3} from './parsha3/Video';
import {razakar} from './razakar/Video';
import {law06} from './law06/Video';
import {law07} from './law07/Video';
import {law08} from './law08/Video';
import {law09} from './law09/Video';
import {law10} from './law10/Video';
import {law11} from './law11/Video';
import {law12} from './law12/Video';
import {law13} from './law13/Video';
import {law14} from './law14/Video';
import {law15} from './law15/Video';
import {law16} from './law16/Video';
import {law17} from './law17/Video';
import {law18} from './law18/Video';
import {law19} from './law19/Video';
import {law20} from './law20/Video';
import {law21} from './law21/Video';
import {law22} from './law22/Video';
import {law23} from './law23/Video';
import {law24} from './law24/Video';
import {law25} from './law25/Video';
import {law26} from './law26/Video';
import {law27} from './law27/Video';
import {law28} from './law28/Video';
import {law29} from './law29/Video';
import {law30} from './law30/Video';
import {law31} from './law31/Video';
import {law32} from './law32/Video';
import {law33} from './law33/Video';
import {law34} from './law34/Video';
import {law35} from './law35/Video';
import {law36} from './law36/Video';
import {law37} from './law37/Video';
import {law38} from './law38/Video';
import {law39} from './law39/Video';
import {law40} from './law40/Video';
import {law41} from './law41/Video';
import {law42} from './law42/Video';
import {law43} from './law43/Video';
import {law44} from './law44/Video';
import {law45} from './law45/Video';
import {law46} from './law46/Video';
import {law47} from './law47/Video';
import {law48} from './law48/Video';
import {b01} from './b01/Video';
import {b02} from './b02/Video';
import {b03} from './b03/Video';
import {b04} from './b04/Video';
import {b05} from './b05/Video';
import {b06} from './b06/Video';
import {b07} from './b07/Video';
import {b08} from './b08/Video';
import {b09} from './b09/Video';
import {b10} from './b10/Video';
import {b11} from './b11/Video';
import {b12} from './b12/Video';
import {b13} from './b13/Video';
import {b14} from './b14/Video';
import {b15} from './b15/Video';
import {b16} from './b16/Video';
import {b17} from './b17/Video';
import {b18} from './b18/Video';
import {b19} from './b19/Video';
import {b20} from './b20/Video';
import {b21} from './b21/Video';
import {b22} from './b22/Video';
import {b23} from './b23/Video';
import {b24} from './b24/Video';
import {b25} from './b25/Video';
import {b26} from './b26/Video';
import {b27} from './b27/Video';
import {b28} from './b28/Video';
import {b29} from './b29/Video';
import {b30} from './b30/Video';


import {VocabPromo, VOCAB_DURATION, VOCAB_TIMING} from './vocab/Video';
import {VocabPromo2, VOCAB2_DURATION, VOCAB2_TIMING} from './vocab2/Video';


import {branded} from './common/Story';
import {CastLineup, NarratorDemo, NarratorFaces, NarratorGestures} from './characters/Showcase';

// থাম্বনেইলের PNG-তে পেজের লোগো
const B_Rhythm0Thumbnail = branded(Rhythm0Thumbnail);
const B_MilgramThumbnail = branded(MilgramThumbnail);
const B_AschThumbnail = branded(AschThumbnail);
const B_BlockbusterThumbnail = branded(BlockbusterThumbnail);
const B_NewCokeThumbnail = branded(NewCokeThumbnail);
const B_McDonaldsThumbnail = branded(McDonaldsThumbnail);

const fromStory = (s: typeof agent) => ({folder: s.folder, C: s.Video, T: branded(s.Thumb, s.logo), fb: s.fb});

// পরের ভিডিওগুলো: [id, ফোল্ডার, ভিডিও, থাম্বনেইল, fallback]
const MORE = [
  {id: 'Kodak', folder: 'kodak/', C: KodakVideo, T: branded(KodakThumbnail), fb: kodakFallback},
  {id: 'PepsiNavy', folder: 'pepsinavy/', C: PepsiNavyVideo, T: branded(PepsiNavyThumbnail), fb: pepsiNavyFallback},
  {id: 'PepsiHarrier', folder: 'harrier/', C: HarrierVideo, T: branded(HarrierThumbnail), fb: harrierFallback},
  {id: 'LightBulb', folder: 'bulb/', C: BulbVideo, T: branded(BulbThumbnail), fb: bulbFallback},
  {id: 'DeBeers', folder: 'debeers/', C: DeBeersVideo, T: branded(DeBeersThumbnail), fb: deBeersFallback},
  {id: 'Fanta', folder: 'fanta/', C: FantaVideo, T: branded(FantaThumbnail), fb: fantaFallback},
  {id: 'CocaCola', folder: 'cocacola/', C: CocaVideo, T: branded(CocaThumbnail), fb: cocaFallback},
  {id: 'Lamborghini', folder: 'lambo/', C: LamboVideo, T: branded(LamboThumbnail), fb: lamboFallback},
  {id: 'AdidasPuma', folder: 'adidas/', C: AdidasVideo, T: branded(AdidasThumbnail), fb: adidasFallback},
  {id: 'Yahoo', folder: 'yahoo/', C: YahooVideo, T: branded(YahooThumbnail), fb: yahooFallback},
  {id: 'Nike', folder: 'nike/', C: NikeVideo, T: branded(NikeThumbnail), fb: nikeFallback},
  {id: 'Volkswagen', folder: 'vw/', C: VwVideo, T: branded(VwThumbnail), fb: vwFallback},
  {id: 'Theranos', folder: 'theranos/', C: TheranosVideo, T: branded(TheranosThumbnail), fb: theranosFallback},
  {id: 'FordPinto', folder: 'pinto/', C: PintoVideo, T: branded(PintoThumbnail), fb: pintoFallback},
  {id: 'Xerox', folder: 'xerox/', C: XeroxVideo, T: branded(XeroxThumbnail), fb: xeroxFallback},
  {id: 'AppleMicrosoft', folder: 'applems/', C: AppleMsVideo, T: branded(AppleMsThumbnail), fb: appleMsFallback},
  {id: 'Nokia', folder: 'nokia/', C: NokiaVideo, T: branded(NokiaThumbnail), fb: nokiaFallback},
  {id: 'SpotlightEffect', folder: 'spotlight/', C: SpotlightVideo, T: branded(SpotlightThumbnail), fb: spotlightFallback},
  {id: 'DunningKruger', folder: 'dunning/', C: DunningVideo, T: branded(DunningThumbnail), fb: dunningFallback},
  {id: 'LearnedHelplessness', folder: 'helpless/', C: HelplessVideo, T: branded(HelplessThumbnail), fb: helplessFallback},
  {id: 'Mirroring', folder: 'mirroring/', C: MirroringVideo, T: branded(MirroringThumbnail), fb: mirroringFallback},
  {id: 'BenFranklin', folder: 'franklin/', C: FranklinVideo, T: branded(FranklinThumbnail), fb: franklinFallback},
  {id: 'BecauseWord', folder: 'because/', C: BecauseVideo, T: branded(BecauseThumbnail), fb: becauseFallback},
  {id: 'FootInDoor', folder: 'foot/', C: FootVideo, T: branded(FootThumbnail), fb: footFallback},
  {id: 'DecoyEffect', folder: 'decoy/', C: DecoyVideo, T: branded(DecoyThumbnail), fb: decoyFallback},
  {id: 'PratfallEffect', folder: 'pratfall/', C: PratfallVideo, T: branded(PratfallThumbnail), fb: pratfallFallback},
  {id: 'ScrollingTrap', folder: 'pigeon/', C: PigeonVideo, T: branded(PigeonThumbnail), fb: pigeonFallback},
  {id: 'StillFace', folder: 'stillface/', C: StillfaceVideo, T: branded(StillfaceThumbnail), fb: stillfaceFallback},
  {id: 'ThirdWave', folder: 'wave/', C: WaveVideo, T: branded(WaveThumbnail), fb: waveFallback},
  {id: 'BystanderEffect', folder: 'bystander/', C: BystanderVideo, T: branded(BystanderThumbnail), fb: bystanderFallback},
  {id: 'PygmalionEffect', folder: 'pygmalion/', C: PygmalionVideo, T: branded(PygmalionThumbnail), fb: pygmalionFallback},
  {id: 'RatPark', folder: 'ratpark/', C: RatparkVideo, T: branded(RatparkThumbnail), fb: ratparkFallback},
  {id: 'BiryaniCrowd', folder: 'biryani/', C: BiryaniVideo, T: branded(BiryaniThumbnail), fb: biryaniFallback},
  {id: 'LandlordRooftop', folder: 'landlord/', C: LandlordVideo, T: branded(LandlordThumbnail), fb: landlordFallback},
  {id: 'TeaSaree', folder: 'saree/', C: SareeVideo, T: branded(SareeThumbnail), fb: sareeFallback},
  {id: 'FatherSalary', folder: 'salary/', C: SalaryVideo, T: branded(SalaryThumbnail), fb: salaryFallback},
  {id: 'FiftyThousandLoan', folder: 'loan/', C: LoanVideo, T: branded(LoanThumbnail), fb: loanFallback},
  {id: 'TenSecondsSilence', folder: 'silence/', C: SilenceVideo, T: branded(SilenceThumbnail), fb: silenceFallback},
  {id: 'AlwaysAvailable', folder: 'friend/', C: FriendVideo, T: branded(FriendThumbnail), fb: friendFallback},
  {id: 'HonestShopkeeper', folder: 'shopkeeper/', C: ShopkeeperVideo, T: branded(ShopkeeperThumbnail), fb: shopkeeperFallback},
  {id: 'TorchesOfFreedom', folder: 'torches/', C: TorchesVideo, T: branded(TorchesThumbnail), fb: torchesFallback},
  // story() দিয়ে বানানো ভিডিও। রেন্ডারের workflow ID খোঁজে এই {id: '…'} ধাঁচে, তাই ধাঁচ বদলাবে না
  {id: 'AgentTrap', ...fromStory(agent)},
  {id: 'BakerySmell', ...fromStory(bakery)},
  {id: 'MilkAtBack', ...fromStory(milk)},
  {id: 'TrialTv', ...fromStory(trialtv)},
  {id: 'FreeDelivery', ...fromStory(delivery)},
  {id: 'SolarLoss', ...fromStory(solar)},
  {id: 'SameVillage', ...fromStory(village)},
  {id: 'WhiteApron', ...fromStory(apron)},
  {id: 'FbLiveSaree', ...fromStory(fblive)},
  {id: 'LowballBike', ...fromStory(bike)},
  {id: 'OneStepMore', ...fromStory(onestep)},
  {id: 'MessLeader', ...fromStory(mess)},
  {id: 'OneComment', ...fromStory(comment)},
  {id: 'GymSign', ...fromStory(gym)},
  {id: 'TwoOptions', ...fromStory(options)},
  {id: 'PlayingDumb', ...fromStory(dumb)},
  {id: 'OnlyHeKnows', ...fromStory(onlyhe)},
  {id: 'StopBegging', ...fromStory(begging)},
  {id: 'WorstTea', ...fromStory(worsttea)},
  {id: 'ToldFriend', ...fromStory(told)},
  // সেরা ৫টা (৫০০ স্ক্রিপ্ট থেকে), Be Beyond Average পেজের লোগো
  {id: 'NigeriaScam', ...fromStory(scam)},
  {id: 'BrownMMs', ...fromStory(brownmm)},
  {id: 'HanoiRats', ...fromStory(hanoirats)},
  {id: 'GreatStink', ...fromStory(stink)},
  {id: 'DollarAuction', ...fromStory(auction)},
  // 48 Laws সিরিজ (প্রতি Law-এ একটা, শেষে পরের পর্বের টিজার), Be Beyond Average পেজের লোগো
  {id: 'Law01Biryani', ...fromStory(law01)},
  {id: 'Law02Password', ...fromStory(law02)},
  {id: 'Law03Haat', ...fromStory(law03)},
  {id: 'Law04SilentClient', ...fromStory(law04)},
  {id: 'Law05OneQuestion', ...fromStory(law05)},
  // ট্রেন্ডিং ঘটনা: পরীমনি আর সাংবাদিক (আসল অডিওর টুকরো, Law 19)
  {id: 'PoriMoniJournalist', ...fromStory(pori)},
  // ট্রেন্ডিং: পরীমনির খামচি আর সাংবাদিকের টিটেনাস টিকা (গালি ফেরত, Law 39)
  {id: 'PoriMoniVaccine', ...fromStory(porivax)},
  // ট্রেন্ডিং: পারশার "পর্দা ফর স্বামী" (Law 38)
  {id: 'ParshaHiddenGroom', ...fromStory(parsha)},
  // ট্রেন্ডিং: পারশার বর আসাদ নূর (আসল ভিডিও, Law 38)
  {id: 'ParshaAsadNoor', ...fromStory(parsha2)},
  // ট্রেন্ডিং: বাঙালির সন্দেহ সত্য (আসাদ নূরের লাইভ, Law 10)
  {id: 'ParshaTruth', ...fromStory(parsha3)},
  // ইতিহাস: ১৪ জুলাই ২০২৪-এর "রাজাকার" মন্তব্য থেকে ৫ আগস্ট (Jawad-এর স্ক্রিপ্ট, Law 4)
  {id: 'OneWordRazakar', ...fromStory(razakar)},
  // 48 Laws সিরিজ Law 6–20 (নতুন সুন্দর চেহারা: common/elegant.tsx)
  {id: 'Law06Shutter', ...fromStory(law06)},
  {id: 'Law07FuchkaList', ...fromStory(law07)},
  {id: 'Law08FreeClass', ...fromStory(law08)},
  {id: 'Law09Envelope', ...fromStory(law09)},
  {id: 'Law10MessRoom', ...fromStory(law10)},
  {id: 'Law11Tailor', ...fromStory(law11)},
  {id: 'Law12FlatSweets', ...fromStory(law12)},
  {id: 'Law13FloodRelief', ...fromStory(law13)},
  {id: 'Law14TeaBill', ...fromStory(law14)},
  {id: 'Law15Internet', ...fromStory(law15)},
  {id: 'Law16Singer', ...fromStory(law16)},
  {id: 'Law17Homework', ...fromStory(law17)},
  {id: 'Law18Wall', ...fromStory(law18)},
  {id: 'Law19Teacher', ...fromStory(law19)},
  {id: 'Law20Land', ...fromStory(law20)},
  {id: 'Law21Wholesale', ...fromStory(law21)},
  {id: 'Law22Parlour', ...fromStory(law22)},
  {id: 'Law23Repair', ...fromStory(law23)},
  {id: 'Law24Key', ...fromStory(law24)},
  {id: 'Law25Electrician', ...fromStory(law25)},
  {id: 'Law26BusFare', ...fromStory(law26)},
  {id: 'Law27Plants', ...fromStory(law27)},
  {id: 'Law28Covers', ...fromStory(law28)},
  {id: 'Law29Melon', ...fromStory(law29)},
  {id: 'Law30Salon', ...fromStory(law30)},
  {id: 'Law31Painter', ...fromStory(law31)},
  {id: 'Law32Ghotok', ...fromStory(law32)},
  {id: 'Law33SchoolGate', ...fromStory(law33)},
  {id: 'Law34Mango', ...fromStory(law34)},
  {id: 'Law35CornerShop', ...fromStory(law35)},
  {id: 'Law36Cricket', ...fromStory(law36)},
  {id: 'Law37Jhalmuri', ...fromStory(law37)},
  {id: 'Law38Returnees', ...fromStory(law38)},
  {id: 'Law39Ghat', ...fromStory(law39)},
  {id: 'Law40Wedding', ...fromStory(law40)},
  {id: 'Law41Bookshop', ...fromStory(law41)},
  {id: 'Law42Hawkers', ...fromStory(law42)},
  {id: 'Law43HouseHelp', ...fromStory(law43)},
  {id: 'Law44Parking', ...fromStory(law44)},
  {id: 'Law45Grocery', ...fromStory(law45)},
  {id: 'Law46Captain', ...fromStory(law46)},
  {id: 'Law47Panjabi', ...fromStory(law47)},
  {id: 'Law48CopyShop', ...fromStory(law48)},
  {id: 'B01LateFine', ...fromStory(b01)},
  {id: 'B02PaidToRead', ...fromStory(b02)},
  {id: 'B03GeniusPraise', ...fromStory(b03)},
  {id: 'B04FortyCakes', ...fromStory(b04)},
  {id: 'B05DoubleHoney', ...fromStory(b05)},
  {id: 'B06HonestPrice', ...fromStory(b06)},
  {id: 'B07NotReturned', ...fromStory(b07)},
  {id: 'B08GateColor', ...fromStory(b08)},
  {id: 'B09GpaBonus', ...fromStory(b09)},
  {id: 'B10EggsNotCash', ...fromStory(b10)},
  {id: 'B11WeddingEnd', ...fromStory(b11)},
  {id: 'B12EyeRoll', ...fromStory(b12)},
  {id: 'B13RetiredBrothers', ...fromStory(b13)},
  {id: 'B14WorkExercise', ...fromStory(b14)},
  {id: 'B15HalfSum', ...fromStory(b15)},
  {id: 'B16TenCleaners', ...fromStory(b16)},
  {id: 'B17LoanLunch', ...fromStory(b17)},
  {id: 'B18NoTimeToHelp', ...fromStory(b18)},
  {id: 'B19CheapLie', ...fromStory(b19)},
  {id: 'B20AddMeat', ...fromStory(b20)},
  {id: 'B21FreeStamps', ...fromStory(b21)},
  {id: 'B22SecondCandy', ...fromStory(b22)},
  {id: 'B23GarageCommission', ...fromStory(b23)},
  {id: 'B24NeighboursBill', ...fromStory(b24)},
  {id: 'B25OneTick', ...fromStory(b25)},
  {id: 'B26SomeoneWatching', ...fromStory(b26)},
  {id: 'B27OneWordMemory', ...fromStory(b27)},
  {id: 'B28ThreeMinutes', ...fromStory(b28)},
  {id: 'B29Transformer', ...fromStory(b29)},
  {id: 'B30ShopMusic', ...fromStory(b30)},
];

// প্রতিটা ভিডিও: মূল ভিডিও + আলাদা থাম্বনেইল (PNG হিসেবে রেন্ডার করা যায়)
export const Root: React.FC = () => {
  return (
    <>
      <Folder name="Characters">
        <Composition id="Narrator-Demo" component={NarratorDemo} width={WIDTH} height={HEIGHT} fps={FPS} durationInFrames={480} />
        <Still id="Narrator-Faces" component={NarratorFaces} width={WIDTH} height={HEIGHT} />
        <Still id="Narrator-Gestures" component={NarratorGestures} width={WIDTH} height={HEIGHT} />
        <Still id="Cast" component={CastLineup} width={WIDTH} height={HEIGHT} />
      </Folder>
      <Folder name="Client">

        <Composition id="VocabBanglaPromo" component={VocabPromo} width={WIDTH} height={HEIGHT} fps={FPS} durationInFrames={VOCAB_DURATION} defaultProps={{timing: VOCAB_TIMING}} />
        <Composition id="VocabBanglaPromo2" component={VocabPromo2} width={WIDTH} height={HEIGHT} fps={FPS} durationInFrames={VOCAB2_DURATION} defaultProps={{timing: VOCAB2_TIMING}} />
      </Folder>
      <Folder name="Rhythm0">
        <Composition
          id="Rhythm0"
          component={Rhythm0}
          width={WIDTH}
          height={HEIGHT}
          fps={FPS}
          durationInFrames={Math.ceil(fallbackTiming.total * FPS)}
          defaultProps={{timing: fallbackTiming, hasAudio: false}}
          calculateMetadata={makeCalculateMetadata('', fallbackTiming)}
        />
        <Still id="Rhythm0-Thumbnail" component={B_Rhythm0Thumbnail} width={WIDTH} height={HEIGHT} />
      </Folder>
      <Folder name="Milgram">
        <Composition
          id="Milgram"
          component={MilgramVideo}
          width={WIDTH}
          height={HEIGHT}
          fps={FPS}
          durationInFrames={Math.ceil(milgramFallback.total * FPS)}
          defaultProps={{timing: milgramFallback, hasAudio: false}}
          calculateMetadata={makeCalculateMetadata('milgram/', milgramFallback)}
        />
        <Still id="Milgram-Thumbnail" component={B_MilgramThumbnail} width={WIDTH} height={HEIGHT} />
      </Folder>
      <Folder name="Asch">
        <Composition
          id="Asch"
          component={AschVideo}
          width={WIDTH}
          height={HEIGHT}
          fps={FPS}
          durationInFrames={Math.ceil(aschFallback.total * FPS)}
          defaultProps={{timing: aschFallback, hasAudio: false}}
          calculateMetadata={makeCalculateMetadata('asch/', aschFallback)}
        />
        <Still id="Asch-Thumbnail" component={B_AschThumbnail} width={WIDTH} height={HEIGHT} />
      </Folder>
      <Folder name="Blockbuster">
        <Composition
          id="Blockbuster"
          component={BlockbusterVideo}
          width={WIDTH}
          height={HEIGHT}
          fps={FPS}
          durationInFrames={Math.ceil(blockbusterFallback.total * FPS)}
          defaultProps={{timing: blockbusterFallback, hasAudio: false}}
          calculateMetadata={makeCalculateMetadata('blockbuster/', blockbusterFallback)}
        />
        <Still id="Blockbuster-Thumbnail" component={B_BlockbusterThumbnail} width={WIDTH} height={HEIGHT} />
      </Folder>
      <Folder name="NewCoke">
        <Composition
          id="NewCoke"
          component={NewCokeVideo}
          width={WIDTH}
          height={HEIGHT}
          fps={FPS}
          durationInFrames={Math.ceil(newCokeFallback.total * FPS)}
          defaultProps={{timing: newCokeFallback, hasAudio: false}}
          calculateMetadata={makeCalculateMetadata('newcoke/', newCokeFallback)}
        />
        <Still id="NewCoke-Thumbnail" component={B_NewCokeThumbnail} width={WIDTH} height={HEIGHT} />
      </Folder>
      <Folder name="McDonalds">
        <Composition
          id="McDonalds"
          component={McDonaldsVideo}
          width={WIDTH}
          height={HEIGHT}
          fps={FPS}
          durationInFrames={Math.ceil(mcdonaldsFallback.total * FPS)}
          defaultProps={{timing: mcdonaldsFallback, hasAudio: false}}
          calculateMetadata={makeCalculateMetadata('mcdonalds/', mcdonaldsFallback)}
        />
        <Still id="McDonalds-Thumbnail" component={B_McDonaldsThumbnail} width={WIDTH} height={HEIGHT} />
      </Folder>
      {MORE.map((v) => (
        <Folder key={v.id} name={v.id}>
          <Composition
            id={v.id}
            component={v.C}
            width={WIDTH}
            height={HEIGHT}
            fps={FPS}
            durationInFrames={Math.ceil(v.fb.total * FPS)}
            defaultProps={{timing: v.fb, hasAudio: false}}
            calculateMetadata={makeCalculateMetadata(v.folder, v.fb)}
          />
          <Still id={`${v.id}-Thumbnail`} component={v.T} width={WIDTH} height={HEIGHT} />
        </Folder>
      ))}
    </>
  );
};
